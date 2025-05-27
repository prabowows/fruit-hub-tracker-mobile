
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface AttendanceRecord {
  id: string;
  user_id: string;
  clock_in_time: string | null;
  clock_out_time: string | null;
  date: string;
  status: 'present' | 'absent' | 'late' | 'early_leave';
  location_lat?: number;
  location_lng?: number;
  notes?: string;
}

export const useAttendance = () => {
  const { user } = useAuth();
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord | null>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch today's attendance record
  const fetchTodayAttendance = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('attendance_records')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching today attendance:', error);
        return;
      }

      // Type cast the status to ensure it matches our AttendanceRecord interface
      if (data) {
        setTodayAttendance({
          ...data,
          status: data.status as 'present' | 'absent' | 'late' | 'early_leave'
        });
      } else {
        setTodayAttendance(null);
      }
    } catch (error) {
      console.error('Error fetching today attendance:', error);
    }
  };

  // Fetch attendance history
  const fetchAttendanceHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('attendance_records')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(30);

      if (error) {
        console.error('Error fetching attendance history:', error);
        return;
      }

      // Type cast the status for each record
      const typedData = (data || []).map(record => ({
        ...record,
        status: record.status as 'present' | 'absent' | 'late' | 'early_leave'
      }));

      setAttendanceHistory(typedData);
    } catch (error) {
      console.error('Error fetching attendance history:', error);
    }
  };

  // Clock in function
  const clockIn = async (location?: { lat: number; lng: number }) => {
    if (!user) return false;

    try {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const clockInTime = now.toISOString();

      const { data, error } = await supabase
        .from('attendance_records')
        .upsert({
          user_id: user.id,
          date: today,
          clock_in_time: clockInTime,
          status: 'present',
          location_lat: location?.lat,
          location_lng: location?.lng,
        })
        .select()
        .single();

      if (error) {
        console.error('Clock in error:', error);
        return false;
      }

      // Type cast the returned data
      setTodayAttendance({
        ...data,
        status: data.status as 'present' | 'absent' | 'late' | 'early_leave'
      });
      
      toast({
        title: "Absen Masuk Berhasil",
        description: `Tercatat pada ${now.toLocaleTimeString('id-ID')}`,
      });
      return true;
    } catch (error) {
      console.error('Clock in error:', error);
      return false;
    }
  };

  // Clock out function
  const clockOut = async (location?: { lat: number; lng: number }) => {
    if (!user || !todayAttendance) return false;

    try {
      const now = new Date();
      const clockOutTime = now.toISOString();

      const { data, error } = await supabase
        .from('attendance_records')
        .update({
          clock_out_time: clockOutTime,
          location_lat: location?.lat,
          location_lng: location?.lng,
        })
        .eq('id', todayAttendance.id)
        .select()
        .single();

      if (error) {
        console.error('Clock out error:', error);
        return false;
      }

      // Type cast the returned data
      setTodayAttendance({
        ...data,
        status: data.status as 'present' | 'absent' | 'late' | 'early_leave'
      });
      
      toast({
        title: "Absen Keluar Berhasil",
        description: `Tercatat pada ${now.toLocaleTimeString('id-ID')}`,
      });
      return true;
    } catch (error) {
      console.error('Clock out error:', error);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      Promise.all([fetchTodayAttendance(), fetchAttendanceHistory()]).finally(() => {
        setIsLoading(false);
      });

      // Set up real-time subscription
      const channel = supabase
        .channel('attendance-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'attendance_records',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            console.log('Attendance record changed:', payload);
            fetchTodayAttendance();
            fetchAttendanceHistory();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  return {
    todayAttendance,
    attendanceHistory,
    isLoading,
    clockIn,
    clockOut,
    refetch: () => {
      fetchTodayAttendance();
      fetchAttendanceHistory();
    },
  };
};
