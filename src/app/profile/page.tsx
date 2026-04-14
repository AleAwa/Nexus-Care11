'use client';

import { useState } from 'react';
import { 
  User, 
  Globe, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Calendar,
  MessageCircle,
  Settings,
  Heart
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProfilePage() {
  const { t, language, setLanguage } = useLanguage();
  const [notifications, setNotifications] = useState({
    appointment: true,
    reminder: true,
    companion: false,
    marketing: false,
  });

  const menuItems = [
    { 
      icon: User, 
      title: language === 'zh' ? '个人信息' : 'Personal Info',
      desc: language === 'zh' ? '姓名、联系方式等' : 'Name, contact info, etc.',
    },
    { 
      icon: Calendar, 
      title: language === 'zh' ? '我的预约' : 'My Appointments',
      desc: language === 'zh' ? '查看预约历史' : 'View appointment history',
      badge: 2,
    },
    { 
      icon: MessageCircle, 
      title: language === 'zh' ? '问诊记录' : 'Consultation History',
      desc: language === 'zh' ? 'AI问诊历史记录' : 'AI consultation history',
    },
    { 
      icon: CreditCard, 
      title: language === 'zh' ? '支付管理' : 'Payment Methods',
      desc: language === 'zh' ? '添加或管理支付方式' : 'Add or manage payments',
    },
    { 
      icon: MapPin, 
      title: language === 'zh' ? '地址管理' : 'Address Book',
      desc: language === 'zh' ? '管理收货地址' : 'Manage addresses',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">
                {language === 'zh' ? '访客用户' : 'Guest User'}
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                {language === 'zh' ? '登录以获取完整功能' : 'Login for full features'}
              </p>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              {language === 'zh' ? '登录/注册' : 'Login'}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-blue-100">
                {language === 'zh' ? '预约' : 'Appointments'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">5</div>
              <div className="text-xs text-blue-100">
                {language === 'zh' ? '问诊' : 'Consultations'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2</div>
              <div className="text-xs text-blue-100">
                {language === 'zh' ? '陪护' : 'Companions'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            {language === 'zh' ? '健康概览' : 'Health Overview'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-700">
                {language === 'zh' ? '良好' : 'Good'}
              </div>
              <div className="text-xs text-green-600">
                {language === 'zh' ? '总体健康状态' : 'Overall Status'}
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-blue-700">2</div>
              <div className="text-xs text-blue-600">
                {language === 'zh' ? '已知过敏' : 'Known Allergies'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            {language === 'zh' ? '功能菜单' : 'Features'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium flex items-center gap-2">
                    {item.title}
                    {item.badge && (
                      <Badge variant="destructive" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {language === 'zh' ? '设置' : 'Settings'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Language Setting */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-500" />
              <span>{t.profile.language}</span>
            </div>
            <Select value={language} onValueChange={(v) => setLanguage(v as 'zh' | 'en')}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notification Toggles */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <span>{language === 'zh' ? '预约提醒' : 'Appointment Reminder'}</span>
              </div>
              <Switch 
                checked={notifications.appointment}
                onCheckedChange={(checked) => setNotifications({...notifications, appointment: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <span>{language === 'zh' ? '用药提醒' : 'Medication Reminder'}</span>
              </div>
              <Switch 
                checked={notifications.reminder}
                onCheckedChange={(checked) => setNotifications({...notifications, reminder: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <span>{language === 'zh' ? '陪护通知' : 'Companion Notifications'}</span>
              </div>
              <Switch 
                checked={notifications.companion}
                onCheckedChange={(checked) => setNotifications({...notifications, companion: checked})}
              />
            </div>
          </div>

          {/* Other Settings */}
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <span>{t.profile.privacy}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-t">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-gray-500" />
              <span>{t.profile.help}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </CardContent>
      </Card>

      {/* Contact & About */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Phone className="w-4 h-4" />
            <span>400-888-9999</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Mail className="w-4 h-4" />
            <span>support@nexuscare.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{language === 'zh' ? '国际医疗中心' : 'International Medical Center'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Button 
        variant="outline" 
        className="w-full text-red-600 border-red-200 hover:bg-red-50"
      >
        <LogOut className="w-4 h-4 mr-2" />
        {t.profile.logout}
      </Button>

      {/* Version */}
      <p className="text-center text-xs text-gray-400 py-4">
        Nexus Care v1.0.0
      </p>
    </div>
  );
}
