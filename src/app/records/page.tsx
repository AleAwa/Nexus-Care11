'use client';

import { useState } from 'react';
import { 
  FileText, 
  Pill, 
  AlertTriangle, 
  History,
  Plus,
  Calendar,
  Download,
  Eye,
  Search,
  Activity
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Mock data
const mockMedicalHistory = [
  {
    id: '1',
    date: '2025-01-10',
    doctor: 'Dr. Wang Wei',
    department: 'Internal Medicine',
    departmentZh: '内科',
    diagnosis: 'Upper respiratory infection',
    diagnosisZh: '上呼吸道感染',
    notes: 'Prescribed rest and medication',
    notesZh: '建议休息并服药',
  },
  {
    id: '2',
    date: '2024-12-15',
    doctor: 'Dr. Li Ming',
    department: 'Cardiology',
    departmentZh: '心内科',
    diagnosis: 'Routine cardiac checkup - Normal',
    diagnosisZh: '常规心脏检查 - 正常',
    notes: 'Continue current medication',
    notesZh: '继续当前用药',
  },
  {
    id: '3',
    date: '2024-11-20',
    doctor: 'Dr. Zhang Hua',
    department: 'Orthopedics',
    departmentZh: '骨科',
    diagnosis: 'Mild lumbar strain',
    diagnosisZh: '轻度腰肌劳损',
    notes: 'Physical therapy recommended',
    notesZh: '建议物理治疗',
  },
];

const mockPrescriptions = [
  {
    id: '1',
    date: '2025-01-10',
    medication: 'Amoxicillin 500mg',
    dosage: '3 times daily',
    duration: '7 days',
    doctor: 'Dr. Wang Wei',
  },
  {
    id: '2',
    date: '2024-12-15',
    medication: 'Atorvastatin 20mg',
    dosage: 'Once daily',
    duration: '30 days',
    doctor: 'Dr. Li Ming',
  },
];

const mockReports = [
  {
    id: '1',
    date: '2024-12-15',
    type: 'ECG',
    typeZh: '心电图',
    result: 'Normal sinus rhythm',
    resultZh: '正常窦性心律',
    hospital: 'International Medical Center',
  },
  {
    id: '2',
    date: '2024-11-20',
    type: 'X-Ray (Lumbar)',
    typeZh: 'X光 (腰椎)',
    result: 'No significant abnormality',
    resultZh: '未见明显异常',
    hospital: 'International Medical Center',
  },
  {
    id: '3',
    date: '2024-10-05',
    type: 'Blood Test',
    typeZh: '血液检查',
    result: 'All values within normal range',
    resultZh: '各项指标正常',
    hospital: 'International Medical Center',
  },
];

const mockAllergies = [
  { id: '1', allergen: 'Penicillin', severity: 'Severe', reaction: 'Anaphylaxis' },
  { id: '2', allergen: 'Seafood', severity: 'Moderate', reaction: 'Skin rash' },
];

export default function RecordsPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.records.title}</h1>
          <p className="text-sm text-gray-500">
            {language === 'zh' 
              ? '管理您的就诊历史和健康信息' 
              : 'Manage your medical history and health info'}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              {t.records.addRecord}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.records.addRecord}</DialogTitle>
              <DialogDescription>
                {language === 'zh' ? '添加新的健康记录' : 'Add new health record'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>{language === 'zh' ? '记录类型' : 'Record Type'}</Label>
                <select className="w-full mt-1 p-2 border rounded-md">
                  <option value="history">{t.records.medicalHistory}</option>
                  <option value="prescription">{t.records.prescriptions}</option>
                  <option value="report">{t.records.reports}</option>
                  <option value="allergy">{t.records.allergies}</option>
                </select>
              </div>
              <div>
                <Label>{language === 'zh' ? '日期' : 'Date'}</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>{language === 'zh' ? '描述' : 'Description'}</Label>
                <Textarea placeholder={language === 'zh' 
                  ? '输入详细信息...' 
                  : 'Enter details...'} />
              </div>
              <Button className="w-full bg-blue-600">{t.common.save}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder={t.common.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 text-center">
            <History className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{mockMedicalHistory.length}</div>
            <div className="text-xs text-blue-600">{t.records.medicalHistory}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4 text-center">
            <Pill className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{mockPrescriptions.length}</div>
            <div className="text-xs text-green-600">{t.records.prescriptions}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 text-center">
            <FileText className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{mockReports.length}</div>
            <div className="text-xs text-purple-600">{t.records.reports}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">{mockAllergies.length}</div>
            <div className="text-xs text-red-600">{t.records.allergies}</div>
          </CardContent>
        </Card>
      </div>

      {/* Allergy Warning */}
      {mockAllergies.length > 0 && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">
                  {language === 'zh' ? '过敏信息' : 'Allergy Information'}
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mockAllergies.map((allergy) => (
                    <Badge key={allergy.id} variant="destructive">
                      {allergy.allergen} ({allergy.severity})
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="history">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="history">
            <History className="w-4 h-4 mr-1" />
            <span className="hidden md:inline">{t.records.medicalHistory}</span>
          </TabsTrigger>
          <TabsTrigger value="prescriptions">
            <Pill className="w-4 h-4 mr-1" />
            <span className="hidden md:inline">{t.records.prescriptions}</span>
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="w-4 h-4 mr-1" />
            <span className="hidden md:inline">{t.records.reports}</span>
          </TabsTrigger>
          <TabsTrigger value="allergies">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span className="hidden md:inline">{t.records.allergies}</span>
          </TabsTrigger>
        </TabsList>

        {/* Medical History */}
        <TabsContent value="history" className="space-y-3 mt-4">
          {mockMedicalHistory.map((record) => (
            <Card key={record.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">
                      {language === 'zh' ? record.diagnosisZh : record.diagnosis}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {language === 'zh' ? record.departmentZh : record.department} - {record.doctor}
                    </p>
                  </div>
                  <Badge variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    {record.date}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {language === 'zh' ? record.notesZh : record.notes}
                </p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {language === 'zh' ? '查看详情' : 'View'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    {language === 'zh' ? '下载' : 'Download'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Prescriptions */}
        <TabsContent value="prescriptions" className="space-y-3 mt-4">
          {mockPrescriptions.map((rx) => (
            <Card key={rx.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Pill className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{rx.medication}</h4>
                      <p className="text-sm text-gray-500">{rx.doctor}</p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    {rx.date}
                  </Badge>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mt-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">{language === 'zh' ? '剂量' : 'Dosage'}:</span>
                      <span className="ml-1 font-medium">{rx.dosage}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">{language === 'zh' ? '疗程' : 'Duration'}:</span>
                      <span className="ml-1 font-medium">{rx.duration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports" className="space-y-3 mt-4">
          {mockReports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {language === 'zh' ? report.typeZh : report.type}
                      </h4>
                      <p className="text-sm text-gray-500">{report.hospital}</p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    {report.date}
                  </Badge>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 mt-2">
                  <p className="text-sm font-medium text-purple-800">
                    {language === 'zh' ? '结果' : 'Result'}: {language === 'zh' ? report.resultZh : report.result}
                  </p>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {language === 'zh' ? '查看报告' : 'View Report'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    {language === 'zh' ? '下载PDF' : 'Download PDF'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Allergies */}
        <TabsContent value="allergies" className="space-y-3 mt-4">
          {mockAllergies.map((allergy) => (
            <Card key={allergy.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{allergy.allergen}</h4>
                      <p className="text-sm text-gray-500">{allergy.reaction}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={allergy.severity === 'Severe' ? 'destructive' : 'secondary'}
                  >
                    {allergy.severity}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {language === 'zh' ? '添加过敏信息' : 'Add Allergy'}
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
