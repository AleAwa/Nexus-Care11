import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 创建陪护申请
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      patient_name,
      patient_phone,
      service_type,
      schedule_date,
      schedule_time,
      location,
      description,
      language = 'zh',
    } = body;

    // Validation
    if (!patient_name || !patient_phone || !service_type || !schedule_date || !schedule_time || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();
    
    const { data, error } = await client
      .from('companion_requests')
      .insert({
        patient_name,
        patient_phone,
        service_type,
        schedule_date: new Date(schedule_date).toISOString(),
        schedule_time,
        location,
        description,
        status: 'pending',
        language,
      })
      .select()
      .single();

    if (error) {
      console.error('Insert companion request error:', error);
      return NextResponse.json(
        { error: 'Failed to create companion request' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Companion API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 获取陪护申请列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const phone = searchParams.get('phone');
    const status = searchParams.get('status');

    const client = getSupabaseClient();
    
    let query = client.from('companion_requests').select('*').order('created_at', { ascending: false });
    
    if (phone) {
      query = query.eq('patient_phone', phone);
    }
    
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Get companion requests error:', error);
      return NextResponse.json(
        { error: 'Failed to get companion requests' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error('Companion API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
