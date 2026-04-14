import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 创建预约
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      patient_name,
      patient_phone,
      department,
      doctor_id,
      appointment_date,
      time_slot,
      notes,
      language = 'zh',
    } = body;

    // Validation
    if (!patient_name || !patient_phone || !department || !doctor_id || !appointment_date || !time_slot) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();
    
    const { data, error } = await client
      .from('appointments')
      .insert({
        patient_name,
        patient_phone,
        department,
        doctor_id,
        appointment_date: new Date(appointment_date).toISOString(),
        time_slot,
        status: 'pending',
        notes,
        language,
      })
      .select()
      .single();

    if (error) {
      console.error('Insert appointment error:', error);
      return NextResponse.json(
        { error: 'Failed to create appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Appointment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 获取预约列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const phone = searchParams.get('phone');
    const status = searchParams.get('status');

    const client = getSupabaseClient();
    
    let query = client.from('appointments').select('*').order('created_at', { ascending: false });
    
    if (phone) {
      query = query.eq('patient_phone', phone);
    }
    
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Get appointments error:', error);
      return NextResponse.json(
        { error: 'Failed to get appointments' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error('Appointment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
