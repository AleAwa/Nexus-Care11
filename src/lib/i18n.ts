// Nexus Care - 双语国际化配置
export type Language = 'zh' | 'en';

export interface Translations {
  // 通用
  common: {
    appName: string;
    loading: string;
    error: string;
    success: string;
    confirm: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    search: string;
    back: string;
    next: string;
    submit: string;
    close: string;
  };
  // 导航
  nav: {
    home: string;
    consultation: string;
    appointment: string;
    companion: string;
    records: string;
    profile: string;
  };
  // 首页
  home: {
    welcome: string;
    subtitle: string;
    quickConsult: string;
    myAppointments: string;
    companionServices: string;
    healthRecords: string;
  };
  // AI导诊
  consultation: {
    title: string;
    subtitle: string;
    placeholder: string;
    startConsult: string;
    symptom: string;
    department: string;
    recommendation: string;
    emergencyTip: string;
    chatPlaceholder: string;
    selectSymptoms: string;
    aiThinking: string;
  };
  // 预约
  appointment: {
    title: string;
    selectDept: string;
    selectDoctor: string;
    selectDate: string;
    selectTime: string;
    confirmBooking: string;
    bookingSuccess: string;
    bookingFailed: string;
    noAvailable: string;
    departments: {
      internal: string;
      surgery: string;
      pediatrics: string;
      gynecology: string;
      orthopedics: string;
      cardiology: string;
      neurology: string;
      dermatology: string;
      ent: string;
      ophthalmology: string;
    };
  };
  // 陪护
  companion: {
    title: string;
    requestService: string;
    myRequests: string;
    taskList: string;
    taskStatus: string;
    pending: string;
    inProgress: string;
    completed: string;
    cancelled: string;
    scheduleTime: string;
    serviceType: string;
    description: string;
    companionName: string;
    contactInfo: string;
  };
  // 健康档案
  records: {
    title: string;
    medicalHistory: string;
    prescriptions: string;
    reports: string;
    allergies: string;
    noRecords: string;
    addRecord: string;
  };
  // 个人中心
  profile: {
    title: string;
    language: string;
    notifications: string;
    privacy: string;
    help: string;
    logout: string;
  };
}

export const translations: Record<Language, Translations> = {
  zh: {
    common: {
      appName: 'Nexus Care',
      loading: '加载中...',
      error: '出错了',
      success: '操作成功',
      confirm: '确认',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      search: '搜索',
      back: '返回',
      next: '下一步',
      submit: '提交',
      close: '关闭',
    },
    nav: {
      home: '首页',
      consultation: 'AI导诊',
      appointment: '预约挂号',
      companion: '陪护照料',
      records: '健康档案',
      profile: '个人中心',
    },
    home: {
      welcome: '您好',
      subtitle: '国际医疗AI双语导诊与陪护系统',
      quickConsult: '快速咨询',
      myAppointments: '我的预约',
      companionServices: '陪护服务',
      healthRecords: '健康档案',
    },
    consultation: {
      title: 'AI智能导诊',
      subtitle: 'Tell me your symptoms, I will help you find the right department',
      placeholder: '请描述您的症状，例如：头痛、发烧、咳嗽...',
      startConsult: '开始咨询',
      symptom: '症状',
      department: '科室',
      recommendation: '推荐科室',
      emergencyTip: '如有紧急情况，请立即拨打急救电话',
      chatPlaceholder: '输入您的问题...',
      selectSymptoms: '选择症状类型',
      aiThinking: 'AI正在分析...',
    },
    appointment: {
      title: '预约挂号',
      selectDept: '选择科室',
      selectDoctor: '选择医生',
      selectDate: '选择日期',
      selectTime: '选择时间',
      confirmBooking: '确认预约',
      bookingSuccess: '预约成功',
      bookingFailed: '预约失败，请重试',
      noAvailable: '暂无可用时段',
      departments: {
        internal: '内科',
        surgery: '外科',
        pediatrics: '儿科',
        gynecology: '妇科',
        orthopedics: '骨科',
        cardiology: '心内科',
        neurology: '神经科',
        dermatology: '皮肤科',
        ent: '耳鼻喉科',
        ophthalmology: '眼科',
      },
    },
    companion: {
      title: '陪护照料',
      requestService: '申请陪护',
      myRequests: '我的申请',
      taskList: '任务列表',
      taskStatus: '任务状态',
      pending: '待接单',
      inProgress: '进行中',
      completed: '已完成',
      cancelled: '已取消',
      scheduleTime: '预约时间',
      serviceType: '服务类型',
      description: '服务描述',
      companionName: '陪护员',
      contactInfo: '联系方式',
    },
    records: {
      title: '健康档案',
      medicalHistory: '就诊历史',
      prescriptions: '处方记录',
      reports: '检查报告',
      allergies: '过敏信息',
      noRecords: '暂无记录',
      addRecord: '添加记录',
    },
    profile: {
      title: '个人中心',
      language: '语言设置',
      notifications: '消息通知',
      privacy: '隐私设置',
      help: '帮助中心',
      logout: '退出登录',
    },
  },
  en: {
    common: {
      appName: 'Nexus Care',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      close: 'Close',
    },
    nav: {
      home: 'Home',
      consultation: 'AI Consultation',
      appointment: 'Appointment',
      companion: 'Companion',
      records: 'Records',
      profile: 'Profile',
    },
    home: {
      welcome: 'Hello',
      subtitle: 'International Medical AI Bilingual Consultation & Companion System',
      quickConsult: 'Quick Consult',
      myAppointments: 'My Appointments',
      companionServices: 'Companion Services',
      healthRecords: 'Health Records',
    },
    consultation: {
      title: 'AI Smart Consultation',
      subtitle: 'Tell me your symptoms, I will help you find the right department',
      placeholder: 'Please describe your symptoms, e.g.: headache, fever, cough...',
      startConsult: 'Start Consultation',
      symptom: 'Symptom',
      department: 'Department',
      recommendation: 'Recommended Department',
      emergencyTip: 'For emergencies, please call emergency services immediately',
      chatPlaceholder: 'Type your question...',
      selectSymptoms: 'Select Symptom Type',
      aiThinking: 'AI is analyzing...',
    },
    appointment: {
      title: 'Make an Appointment',
      selectDept: 'Select Department',
      selectDoctor: 'Select Doctor',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      confirmBooking: 'Confirm Booking',
      bookingSuccess: 'Booking Successful',
      bookingFailed: 'Booking failed, please try again',
      noAvailable: 'No available slots',
      departments: {
        internal: 'Internal Medicine',
        surgery: 'Surgery',
        pediatrics: 'Pediatrics',
        gynecology: 'Gynecology',
        orthopedics: 'Orthopedics',
        cardiology: 'Cardiology',
        neurology: 'Neurology',
        dermatology: 'Dermatology',
        ent: 'ENT',
        ophthalmology: 'Ophthalmology',
      },
    },
    companion: {
      title: 'Companion Care',
      requestService: 'Request Service',
      myRequests: 'My Requests',
      taskList: 'Task List',
      taskStatus: 'Task Status',
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
      scheduleTime: 'Schedule Time',
      serviceType: 'Service Type',
      description: 'Description',
      companionName: 'Companion',
      contactInfo: 'Contact',
    },
    records: {
      title: 'Health Records',
      medicalHistory: 'Medical History',
      prescriptions: 'Prescriptions',
      reports: 'Reports',
      allergies: 'Allergies',
      noRecords: 'No Records',
      addRecord: 'Add Record',
    },
    profile: {
      title: 'Profile',
      language: 'Language',
      notifications: 'Notifications',
      privacy: 'Privacy',
      help: 'Help Center',
      logout: 'Logout',
    },
  },
};

export const getTranslation = (lang: Language): Translations => translations[lang];
