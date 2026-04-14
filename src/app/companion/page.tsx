'use client';

import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Clock, 
  Phone, 
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  FileText,
  User
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Mock companion requests data
const mockRequests = [
  {
    id: '1',
    status: 'pending',
    serviceType: 'Hospital Visit Companion',
    serviceTypeZh: '就医陪诊',
    date: '2025-01-15',
    time: '09:00',
    location: 'International Medical Center',
    description: 'Need assistance with registration and translation',
    descriptionZh: '需要帮忙挂号和翻译',
    companion: null,
  },
  {
    id: '2',
    status: 'in_progress',
    serviceType: 'Surgery Recovery Care',
    serviceTypeZh: '术后陪护',
    date: '2025-01-18',
    time: '14:00',
    location: 'VIP Ward, Floor 8',
    description: 'Post-surgery care and medication reminders',
    descriptionZh: '术后护理和用药提醒',
    companion: {
      name: 'Zhang Li',
      nameZh: '张丽',
      phone: '+86 138****5678',
      avatar: null,
    },
  },
  {
    id: '3',
    status: 'completed',
    serviceType: 'Elderly Care',
    serviceTypeZh: '老人陪护',
    date: '2025-01-10',
    time: '10:00',
    location: 'Geriatrics Department',
    description: 'Regular check-up accompaniment',
    descriptionZh: '定期体检陪同',
    companion: {
      name: 'Wang Qiang',
      nameZh: '王强',
      phone: '+86 139****1234',
      avatar: null,
    },
  },
];

const serviceTypes = [
  { id: 'visit', name: 'Hospital Visit Companion', nameZh: '就医陪诊' },
  { id: 'surgery', name: 'Surgery Recovery Care', nameZh: '术后陪护' },
  { id: 'elderly', name: 'Elderly Care', nameZh: '老人陪护' },
  { id: 'child', name: 'Child Care', nameZh: '儿童陪护' },
  { id: 'checkup', name: 'Check-up Accompaniment', nameZh: '体检陪同' },
];

export default function CompanionPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('requests');
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    serviceType: '',
    date: '',
    time: '',
    description: '',
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50">
            <AlertCircle className="w-3 h-3 mr-1" />
            {t.companion.pending}
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
            <Clock className="w-3 h-3 mr-1" />
            {t.companion.inProgress}
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="text-green-600 border-green-300 bg-green-50">
            <CheckCircle className="w-3 h-3 mr-1" />
            {t.companion.completed}
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-300 bg-gray-50">
            <XCircle className="w-3 h-3 mr-1" />
            {t.companion.cancelled}
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleSubmitRequest = () => {
    // In real app, submit to backend
    console.log('Submitting request:', newRequest);
    setShowNewRequest(false);
    setNewRequest({ serviceType: '', date: '', time: '', description: '' });
  };

  const filteredRequests = mockRequests.filter(req => {
    if (activeTab === 'requests') return true;
    if (activeTab === 'pending') return req.status === 'pending';
    if (activeTab === 'active') return req.status === 'in_progress';
    if (activeTab === 'completed') return req.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <CardTitle>{t.companion.title}</CardTitle>
                <CardDescription className="text-purple-100">
                  {language === 'zh' 
                    ? '专业陪护人员，全程贴心服务' 
                    : 'Professional companions, caring service'}
                </CardDescription>
              </div>
            </div>
            <Dialog open={showNewRequest} onOpenChange={setShowNewRequest}>
              <DialogTrigger asChild>
                <Button className="bg-white text-purple-600 hover:bg-purple-50">
                  <Plus className="w-4 h-4 mr-2" />
                  {t.companion.requestService}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.companion.requestService}</DialogTitle>
                  <DialogDescription>
                    {language === 'zh' 
                      ? '填写陪护服务申请，我们尽快为您安排' 
                      : 'Fill in the request and we will arrange for you'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>{t.companion.serviceType}</Label>
                    <select
                      className="w-full mt-1 p-2 border rounded-md"
                      value={newRequest.serviceType}
                      onChange={(e) => setNewRequest({...newRequest, serviceType: e.target.value})}
                    >
                      <option value="">
                        {language === 'zh' ? '选择服务类型' : 'Select service type'}
                      </option>
                      {serviceTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {language === 'zh' ? type.nameZh : type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{t.companion.scheduleTime}</Label>
                      <Input
                        type="date"
                        value={newRequest.date}
                        onChange={(e) => setNewRequest({...newRequest, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>{language === 'zh' ? '时间' : 'Time'}</Label>
                      <Input
                        type="time"
                        value={newRequest.time}
                        onChange={(e) => setNewRequest({...newRequest, time: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>{t.companion.description}</Label>
                    <Textarea
                      value={newRequest.description}
                      onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                      placeholder={language === 'zh' 
                        ? '描述您的具体需求...' 
                        : 'Describe your specific needs...'}
                    />
                  </div>
                  <Button 
                    className="w-full bg-purple-600" 
                    onClick={handleSubmitRequest}
                    disabled={!newRequest.serviceType || !newRequest.date}
                  >
                    {t.common.submit}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requests">
            {language === 'zh' ? '全部' : 'All'}
          </TabsTrigger>
          <TabsTrigger value="pending">
            {language === 'zh' ? '待接单' : 'Pending'}
          </TabsTrigger>
          <TabsTrigger value="active">
            {language === 'zh' ? '进行中' : 'Active'}
          </TabsTrigger>
          <TabsTrigger value="completed">
            {language === 'zh' ? '已完成' : 'Done'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4 space-y-3">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">
                      {language === 'zh' ? request.serviceTypeZh : request.serviceType}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {language === 'zh' ? request.descriptionZh : request.description}
                    </p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {request.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {request.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {request.location}
                  </div>
                </div>

                {request.companion && (
                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {language === 'zh' ? request.companion.nameZh : request.companion.name}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {request.companion.phone}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        {language === 'zh' ? '联系' : 'Call'}
                      </Button>
                    </div>
                  </div>
                )}

                {request.status === 'pending' && (
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1 text-red-600">
                      {language === 'zh' ? '取消申请' : 'Cancel'}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="w-4 h-4 mr-1" />
                      {language === 'zh' ? '查看详情' : 'Details'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>{language === 'zh' ? '暂无记录' : 'No records'}</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
