'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

// Mock data
const mockDoctors = [
  { id: '1', name: 'Dr. Wang Wei', specialty: 'Internal Medicine', dept: 'internal', available: true },
  { id: '2', name: 'Dr. Li Ming', specialty: 'Cardiology', dept: 'cardiology', available: true },
  { id: '3', name: 'Dr. Zhang Hua', specialty: 'Orthopedics', dept: 'orthopedics', available: false },
  { id: '4', name: 'Dr. Chen Lin', specialty: 'Neurology', dept: 'neurology', available: true },
  { id: '5', name: 'Dr. Liu Yan', specialty: 'Pediatrics', dept: 'pediatrics', available: true },
  { id: '6', name: 'Dr. Huang Jian', specialty: 'Surgery', dept: 'surgery', available: true },
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

const departments = [
  { id: 'internal', icon: '🩺', name: 'Internal Medicine', nameZh: '内科' },
  { id: 'surgery', icon: '🔪', name: 'Surgery', nameZh: '外科' },
  { id: 'pediatrics', icon: '👶', name: 'Pediatrics', nameZh: '儿科' },
  { id: 'gynecology', icon: '👩', name: 'Gynecology', nameZh: '妇科' },
  { id: 'cardiology', icon: '❤️', name: 'Cardiology', nameZh: '心内科' },
  { id: 'neurology', icon: '🧠', name: 'Neurology', nameZh: '神经科' },
  { id: 'orthopedics', icon: '🦴', name: 'Orthopedics', nameZh: '骨科' },
  { id: 'dermatology', icon: '🧴', name: 'Dermatology', nameZh: '皮肤科' },
  { id: 'ent', icon: '👂', name: 'ENT', nameZh: '耳鼻喉科' },
  { id: 'ophthalmology', icon: '👁️', name: 'Ophthalmology', nameZh: '眼科' },
];

export default function AppointmentPage() {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredDoctors = mockDoctors.filter(d => d.dept === selectedDept);

  const handleDeptSelect = (dept: string) => {
    setSelectedDept(dept);
    setSelectedDoctor('');
    setStep(2);
  };

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setStep(3);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) setStep(4);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDept && selectedDoctor && selectedDate && selectedTime) {
      setBookingSuccess(true);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedDept('');
    setSelectedDoctor('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setBookingSuccess(false);
  };

  const selectedDoctorData = mockDoctors.find(d => d.id === selectedDoctor);

  if (bookingSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t.appointment.bookingSuccess}
        </h2>
        <Card className="mt-6 text-left">
          <CardContent className="space-y-3 pt-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <span>{selectedDoctorData?.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span>{selectedDate?.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{selectedTime}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>International Medical Center, Floor 3</span>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 space-y-3">
          <Button className="w-full bg-blue-600" onClick={resetBooking}>
            {language === 'zh' ? '预约新的门诊' : 'Book Another'}
          </Button>
          <Button variant="outline" className="w-full">
            {language === 'zh' ? '添加至日历' : 'Add to Calendar'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step > s ? <CheckCircle className="w-4 h-4" /> : s}
            </div>
            {s < 4 && (
              <div
                className={`w-12 md:w-20 h-1 mx-1 ${
                  step > s ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Department */}
      {step >= 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">🏥</span>
              {t.appointment.selectDept}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => handleDeptSelect(dept.id)}
                  className={`p-3 rounded-xl border-2 text-center transition-all hover:border-blue-500 hover:bg-blue-50 ${
                    selectedDept === dept.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{dept.icon}</div>
                  <div className="text-sm font-medium">
                    {language === 'zh' ? dept.nameZh : dept.name}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Select Doctor */}
      {step >= 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              {t.appointment.selectDoctor}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredDoctors.length > 0 ? (
              <div className="space-y-3">
                {filteredDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => handleDoctorSelect(doctor.id)}
                    className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all hover:border-blue-500 ${
                      selectedDoctor === doctor.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-sm text-gray-500">{doctor.specialty}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={doctor.available ? 'default' : 'secondary'}>
                        {doctor.available 
                          ? (language === 'zh' ? '可预约' : 'Available')
                          : (language === 'zh' ? '已约满' : 'Full')
                        }
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                {language === 'zh' ? '请先选择科室' : 'Please select a department first'}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Select Date */}
      {step >= 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              {t.appointment.selectDate}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today || date.getDay() === 0;
              }}
              className="rounded-md border w-full"
            />
          </CardContent>
        </Card>
      )}

      {/* Step 4: Select Time */}
      {step >= 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              {t.appointment.selectTime}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`p-3 rounded-lg border-2 text-center font-medium transition-all hover:border-blue-500 ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-200 hover:bg-blue-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* Confirm Button */}
            {selectedTime && (
              <div className="mt-6">
                <Button
                  onClick={handleConfirm}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
                >
                  {t.appointment.confirmBooking}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      {step > 1 && (
        <Card className="bg-gray-50">
          <CardContent className="pt-4">
            <h4 className="font-medium text-sm text-gray-500 mb-2">
              {language === 'zh' ? '当前选择' : 'Current Selection'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedDept && (
                <Badge variant="outline">
                  {departments.find(d => d.id === selectedDept)?.[language === 'zh' ? 'nameZh' : 'name']}
                </Badge>
              )}
              {selectedDoctor && (
                <Badge variant="outline">
                  {selectedDoctorData?.name}
                </Badge>
              )}
              {selectedDate && (
                <Badge variant="outline">
                  {selectedDate.toLocaleDateString()}
                </Badge>
              )}
              {selectedTime && <Badge variant="outline">{selectedTime}</Badge>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
