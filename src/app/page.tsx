'use client';

import Link from 'next/link';
import { 
  MessageCircle, 
  Calendar, 
  Users, 
  FileText, 
  ArrowRight,
  Shield,
  Clock,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { t, language } = useLanguage();

  const quickActions = [
    {
      icon: MessageCircle,
      title: language === 'zh' ? 'AI智能导诊' : 'AI Consultation',
      desc: language === 'zh' ? '描述症状，获取科室建议' : 'Describe symptoms, get department advice',
      href: '/consultation',
      color: 'bg-blue-500',
    },
    {
      icon: Calendar,
      title: language === 'zh' ? '预约挂号' : 'Appointment',
      desc: language === 'zh' ? '在线预约医生和时间' : 'Book doctors and time slots online',
      href: '/appointment',
      color: 'bg-green-500',
    },
    {
      icon: Users,
      title: language === 'zh' ? '陪护照料' : 'Companion Care',
      desc: language === 'zh' ? '专业陪护人员全程陪同' : 'Professional companion throughout',
      href: '/companion',
      color: 'bg-purple-500',
    },
    {
      icon: FileText,
      title: language === 'zh' ? '健康档案' : 'Health Records',
      desc: language === 'zh' ? '管理您的就诊记录' : 'Manage your medical records',
      href: '/records',
      color: 'bg-orange-500',
    },
  ];

  const features = [
    {
      icon: Globe,
      title: language === 'zh' ? '双语服务' : 'Bilingual Service',
      desc: language === 'zh' 
        ? '中英文无缝切换，跨语言无障碍沟通' 
        : 'Seamless Chinese-English switching',
    },
    {
      icon: Shield,
      title: language === 'zh' ? '隐私保护' : 'Privacy Protected',
      desc: language === 'zh' 
        ? '医疗数据加密存储，安全可靠' 
        : 'Encrypted medical data storage',
    },
    {
      icon: Clock,
      title: language === 'zh' ? '24小时服务' : '24/7 Available',
      desc: language === 'zh' 
        ? '全天候AI导诊，随时随地获得帮助' 
        : 'AI consultation available anytime',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl md:text-3xl">👋</span>
          <h1 className="text-2xl md:text-3xl font-bold">
            {t.home.welcome}
          </h1>
        </div>
        <p className="text-blue-100 text-sm md:text-base mb-4">
          {t.home.subtitle}
        </p>
        <p className="text-blue-100 text-xs">
          {t.consultation.emergencyTip}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.href} href={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader className="pb-2">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-base">{action.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs">
                    {action.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-4 border border-gray-100">
              <Icon className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Consult CTA */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="flex items-center justify-between p-4 md:p-6">
          <div>
            <h3 className="font-semibold text-green-800 mb-1">
              {language === 'zh' ? '立即开始AI导诊' : 'Start AI Consultation Now'}
            </h3>
            <p className="text-sm text-green-600">
              {language === 'zh' 
                ? '智能分析您的症状，推荐最合适的科室' 
                : 'AI analyzes your symptoms and recommends the best department'}
            </p>
          </div>
          <Link href="/consultation">
            <Button className="bg-green-600 hover:bg-green-700">
              <span className="hidden md:inline mr-2">{language === 'zh' ? '开始咨询' : 'Start'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Language Notice */}
      <div className="text-center text-sm text-gray-500 py-4">
        {language === 'zh' 
          ? '点击右上角可切换中/英文界面' 
          : 'Click the top right to switch between Chinese and English'}
      </div>
    </div>
  );
}
