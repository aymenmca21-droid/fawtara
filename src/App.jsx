import { useState, useRef, useMemo, useEffect } from "react";

/* ═══════════════════════════════════════════════
   TRANSLATIONS
═══════════════════════════════════════════════ */
const T = {
  fr: {
    appName:"Fawtara",
    // nav
    home:"Accueil", invoices:"Factures", customers:"Clients", history:"Historique",
    // auth
    createAccount:"Créer un compte", loginTitle:"Connexion",
    shopName:"Nom du commerce", shopNamePh:"Ex: Épicerie Al Amal",
    username:"Nom d'utilisateur", usernamePh:"Ex: ahmed2024",
    password:"Mot de passe", passwordPh:"Min. 6 caractères",
    confirmPass:"Confirmer le mot de passe",
    registerBtn:"Créer mon compte", loginBtn:"Se connecter",
    haveAccount:"Déjà un compte ?", noAccount:"Pas encore de compte ?",
    wrongCreds:"Identifiants incorrects", userExists:"Ce nom d'utilisateur existe déjà",
    passShort:"Mot de passe trop court (min. 6)", passMismatch:"Les mots de passe ne correspondent pas",
    accountCreated:"Compte créé ! Bienvenue 🎉",
    fieldRequired:"Tous les champs sont requis",
    activCodePh:"Code d'activation (XXXX-XXXX)",
    invalidCode:"Code d'activation invalide ou déjà utilisé",
    refCodePh:"Code de parrainage (optionnel)",
    refCodeInvalid:"Code de parrainage introuvable",
    myRefCode:"Mon code de parrainage",
    refTitle:"Parrainage",
    refInvited:"Personnes invitées",
    refNewUser:"Nouvel inscrit",
    refDate:"Date",
    refCCP:"N° CCP",
    refWhatsapp:"WhatsApp",
    refNotif:"🎉 Quelqu'un s'est inscrit avec votre code !",
    refNotifSub:name=>`${name} a rejoint Fawtara grâce à vous`,
    refFillInfo:"Entrez vos coordonnées pour recevoir votre récompense",
    refCCPPh:"Votre numéro CCP",
    refWAPh:"Votre numéro WhatsApp",
    refSend:"Envoyer",
    refSent:"Envoyé ✓",
    refNoInvites:"Aucune invitation pour l'instant",
    refCopy:"Copier le code",
    refCopied:"Copié ✓",
    refShare:"Partager sur WhatsApp",
    // admin referrals
    adminRefTitle:"Parrainages reçus",
    adminRefEmpty:"Aucun parrainage",
    // home
    profit:"Bénéfice net 💰", income:"Revenus", expenses:"Dépenses", owed:"À recevoir",
    unpaid:"À encaisser", noUnpaid:"Tout est encaissé 🎉", markPaid:"Encaissé ✓",
    insight_unpaid:n=>`${n} paiement${n>1?"s":""} en attente`, insight_up:"Gagnez 1 000 DA 💰",
    // tx modal
    addIncome:"Revenu", addExpense:"Dépense",
    descPh:"Description", amtPh:"Montant en DA", clientPh:"Client (optionnel)",
    received:"Reçu ?", yes:"Oui", no:"Pas encore",
    save:"Enregistrer", cancel:"Annuler",
    // login / onboard
    loginHint:"admin / admin123", loginBtn:"Entrer", wrongCreds:"Mauvais identifiants",
    welcome:"Bienvenue 👋", welcomeSub:"Par où commencer ?",
    demo:"Voir démo", noHistory:"Aucune transaction",
    // invoice
    newInvoice:"Nouvelle facture", invoiceNo:"Facture N°",
    customer:"Client", selectCustomer:"Choisir un client...",
    products:"Produits", addProduct:"+ Produit",
    qty:"Qté", unitPrice:"Prix", total:"Total", subtotal:"Sous-total",
    payStatus:"Paiement", paid:"Payé", partial:"Partiel",
    paidAmount:"Montant reçu", createInvoice:"Créer la facture",
    downloadPDF:"Télécharger PDF", invoiceCreated:"Facture créée ✓",
    printInvoice:"Imprimer",
    noInvoices:"Aucune facture", suggestedProducts:"Suggérés",
    statusPaid:"Payé", statusUnpaid:"Impayé", statusPartial:"Partiel",
    // products
    manageProducts:"Produits", addNewProduct:"Nouveau produit",
    productName:"Nom", productPrice:"Prix", productStock:"Stock",
    editProduct:"Modifier", noProducts:"Aucun produit",
    // customers
    totalCustomers:"Clients", totalRevenue:"Revenus clients", totalDebt:"Dettes totales",
    topCustomers:"Meilleurs clients", mostActive:"Plus actifs",
    newCustomer:"+ Nouveau client", editCustomer:"Modifier",
    customerName:"Nom complet", customerPhone:"Téléphone",
    totalSpent:"Total acheté", currentDebt:"Dette actuelle",
    lastSeen:"Dernier achat", purchaseHistory:"Historique achats",
    noCustomers:"Aucun client pour l'instant",
    addFirstCustomer:"Ajouter un client",
    customerDetail:"Détail client", backToList:"← Retour",
    boughtProducts:"Produits achetés",
    invoiceCount:"Facture(s)",
    insight_frequent:"Ce client achète fréquemment",
    insight_hasDebt:"Ce client a des factures impayées",
    insight_bigSpender:"C'est un grand acheteur",
    insight_new:"Nouveau client",
    insight_loyal:"Client fidèle",
    phone:"Téléphone", namePh:"Nom du client", phonePh:"Numéro de téléphone",
    deleteCustomer:"Supprimer",
    confirmDeleteTitle:"Supprimer ce client ?",
    confirmDeleteMsg:name=>`Voulez-vous vraiment supprimer "${name}" ? Cette action est irréversible.`,
    confirmDelete:"Oui, supprimer",
    rank:"#",
    companyName:"Mon Entreprise",
    spentLabel:"dépensé",
    debtLabel:"doit",
    settings:"Paramètres",
    settingsTitle:"Paramètres de l'entreprise",
    companyNameLabel:"Nom de l'entreprise",
    companyNamePh:"Ex: Mon Commerce SARL",
    companyNameHint:"Apparaît sur toutes vos factures PDF",
    settingsSaved:"Paramètres enregistrés ✓",
    confirmPaid:"Confirmer l'encaissement",
    confirmPaidMsg:(n,a)=>`Marquer la facture de ${n} comme encaissée (${a}) ?`,
    confirmYes:"Oui, encaisser",
    confirmNo:"Annuler",
    detail:"Détail",
    payments:"Paiements reçus",
    addPayment:"+ Ajouter un paiement",
    paymentAmount:"Montant de la dépense (DA)",
    paymentDate:"Date",
    paymentNote:"Note (optionnel)",
    paymentSaved:"Paiement ajouté ✓",
    remaining:"Reste à payer",
    firstPayment:"1ère dépense",
    paymentNum:n=>`Dépense ${n}`,
    fullyPaid:"Entièrement payé ✓",
    noPayments:"Aucun paiement enregistré",
  },
  ar: {
    appName:"فاتورة",
    home:"الرئيسية", invoices:"الفواتير", customers:"العملاء", history:"السجل",
    // auth
    createAccount:"إنشاء حساب", loginTitle:"تسجيل الدخول",
    shopName:"اسم المحل", shopNamePh:"مثال: بقالة الأمل",
    username:"اسم المستخدم", usernamePh:"مثال: ahmed2024",
    password:"كلمة المرور", passwordPh:"6 أحرف على الأقل",
    confirmPass:"تأكيد كلمة المرور",
    registerBtn:"إنشاء حسابي", loginBtn:"دخول",
    haveAccount:"لديك حساب ؟", noAccount:"ليس لديك حساب ؟",
    wrongCreds:"بيانات خاطئة", userExists:"اسم المستخدم موجود مسبقاً",
    passShort:"كلمة المرور قصيرة جداً (6 أحرف)", passMismatch:"كلمتا المرور غير متطابقتين",
    accountCreated:"تم إنشاء الحساب! أهلاً بك 🎉",
    fieldRequired:"جميع الحقول مطلوبة",
    activCodePh:"كود التفعيل (XXXX-XXXX)",
    invalidCode:"كود التفعيل غير صالح أو مستخدم مسبقاً",
    refCodePh:"كود الدعوة (اختياري)",
    refCodeInvalid:"كود الدعوة غير موجود",
    myRefCode:"كود الدعوة الخاص بي",
    refTitle:"الإحالات",
    refInvited:"المدعوون",
    refNewUser:"المستخدم الجديد",
    refDate:"التاريخ",
    refCCP:"رقم CCP",
    refWhatsapp:"واتساب",
    refNotif:"🎉 شخص سجّل باستخدام كودك!",
    refNotifSub:name=>`${name} انضم إلى Fawtara بفضلك`,
    refFillInfo:"أدخل بياناتك لاستلام مكافأتك",
    refCCPPh:"رقم CCP الخاص بك",
    refWAPh:"رقم واتساب",
    refSend:"إرسال",
    refSent:"تم الإرسال ✓",
    refNoInvites:"لا دعوات بعد",
    refCopy:"نسخ الكود",
    refCopied:"تم النسخ ✓",
    refShare:"مشاركة عبر واتساب",
    adminRefTitle:"الإحالات الواردة",
    adminRefEmpty:"لا توجد إحالات",
    profit:"صافي الربح", income:"الإيرادات", expenses:"المصروفات", owed:"المستحقات",
    unpaid:"لم يُستلم", noUnpaid:"كل شيء مُحصَّل 🎉", markPaid:"تم ✓",
    insight_unpaid:n=>`${n} دفعة معلقة`, insight_up:"اربح 1000 دج 💰",
    addIncome:"إيراد", addExpense:"مصروف",
    descPh:"الوصف", amtPh:"المبلغ", clientPh:"العميل",
    received:"مُستلم؟", yes:"نعم", no:"ليس بعد",
    save:"حفظ", cancel:"إلغاء",
    loginHint:"admin / admin123", loginBtn:"دخول", wrongCreds:"بيانات خاطئة",
    welcome:"أهلاً 👋", welcomeSub:"ابدأ بـ",
    demo:"عرض تجريبي", noHistory:"لا توجد معاملات",
    newInvoice:"فاتورة جديدة", invoiceNo:"فاتورة رقم",
    customer:"العميل", selectCustomer:"اختر عميلاً...",
    products:"المنتجات", addProduct:"+ منتج",
    qty:"الكمية", unitPrice:"السعر", total:"المجموع", subtotal:"المجموع الفرعي",
    payStatus:"الدفع", paid:"مدفوع", partial:"جزئي",
    paidAmount:"المبلغ المستلم", createInvoice:"إنشاء الفاتورة",
    downloadPDF:"تحميل PDF", invoiceCreated:"تم إنشاء الفاتورة ✓",
    printInvoice:"طباعة",
    noInvoices:"لا توجد فواتير", suggestedProducts:"مقترحة",
    statusPaid:"مدفوع", statusUnpaid:"غير مدفوع", statusPartial:"جزئي",
    manageProducts:"المنتجات", addNewProduct:"منتج جديد",
    productName:"الاسم", productPrice:"السعر", productStock:"المخزون",
    editProduct:"تعديل", noProducts:"لا منتجات",
    totalCustomers:"العملاء", totalRevenue:"إيرادات العملاء", totalDebt:"إجمالي الديون",
    topCustomers:"أفضل العملاء", mostActive:"الأكثر نشاطاً",
    newCustomer:"+ عميل جديد", editCustomer:"تعديل",
    customerName:"الاسم الكامل", customerPhone:"الهاتف",
    totalSpent:"إجمالي المشتريات", currentDebt:"الدين الحالي",
    lastSeen:"آخر شراء", purchaseHistory:"تاريخ المشتريات",
    noCustomers:"لا يوجد عملاء بعد",
    addFirstCustomer:"أضف عميلاً",
    customerDetail:"تفاصيل العميل", backToList:"← رجوع",
    boughtProducts:"المنتجات المشتراة",
    invoiceCount:"فاتورة",
    insight_frequent:"هذا العميل يشتري بانتظام",
    insight_hasDebt:"لدى هذا العميل فواتير غير مدفوعة",
    insight_bigSpender:"عميل ذو إنفاق مرتفع",
    insight_new:"عميل جديد",
    insight_loyal:"عميل وفي",
    phone:"الهاتف", namePh:"اسم العميل", phonePh:"رقم الهاتف",
    deleteCustomer:"حذف",
    confirmDeleteTitle:"حذف هذا العميل؟",
    confirmDeleteMsg:name=>`هل تريد حذف "${name}" نهائياً؟ لا يمكن التراجع عن هذا الإجراء.`,
    confirmDelete:"نعم، احذف",
    rank:"#",
    companyName:"شركتي",
    spentLabel:"أنفق",
    debtLabel:"يدين",
    settings:"الإعدادات",
    settingsTitle:"إعدادات الشركة",
    companyNameLabel:"اسم الشركة",
    companyNamePh:"مثال: متجر الأمل",
    companyNameHint:"يظهر في جميع فواتير PDF",
    settingsSaved:"تم حفظ الإعدادات ✓",
    confirmPaid:"تأكيد الاستلام",
    confirmPaidMsg:(n,a)=>`تأكيد استلام دفعة ${n} بمبلغ ${a} ؟`,
    confirmYes:"نعم، تم الاستلام",
    confirmNo:"إلغاء",
    detail:"تفاصيل",
    payments:"الدفعات المستلمة",
    addPayment:"+ إضافة دفعة",
    paymentAmount:"مبلغ الدفعة (DA)",
    paymentDate:"التاريخ",
    paymentNote:"ملاحظة (اختياري)",
    paymentSaved:"تم إضافة الدفعة ✓",
    remaining:"المتبقي",
    firstPayment:"الدفعة الأولى",
    paymentNum:n=>`الدفعة ${n}`,
    fullyPaid:"مُسدَّد بالكامل ✓",
    noPayments:"لا توجد دفعات مسجلة",
  }
};

/* ═══════════════════════════════════════════════
   SEED DATA
═══════════════════════════════════════════════ */
const DEMO_CUSTOMERS_RAW = [
  {id:"c1", name:"Acme Corp",    phone:"0555 123 456"},
  {id:"c2", name:"SoftTech",     phone:"0661 789 012"},
  {id:"c3", name:"BioMart",      phone:"0770 345 678"},
  {id:"c4", name:"Khalid & Fils",phone:"0550 901 234"},
  {id:"c5", name:"Innova SARL",  phone:"0660 567 890"},
];
const DEMO_TXS=[
  {id:"t1", type:"income", amount:12500,desc:"Vente en gros",      client:"Acme Corp",    date:"2025-03-01",paid:true, invoiceId:"INV-001"},
  {id:"t2", type:"income", amount:8000, desc:"Consultation",       client:"SoftTech",     date:"2025-03-05",paid:false,invoiceId:"INV-002"},
  {id:"t3", type:"expense",amount:2200, desc:"Loyer bureau",       client:"",             date:"2025-03-01",paid:true, invoiceId:null},
  {id:"t4", type:"expense",amount:450,  desc:"Électricité",        client:"",             date:"2025-03-08",paid:true, invoiceId:null},
  {id:"t5", type:"income", amount:5500, desc:"Commande #2219",     client:"BioMart",      date:"2025-03-10",paid:false,invoiceId:"INV-003"},
  {id:"t6", type:"expense",amount:1200, desc:"Transport",          client:"",             date:"2025-03-12",paid:true, invoiceId:null},
  {id:"t7", type:"income", amount:3000, desc:"Maintenance",        client:"Khalid & Fils",date:"2025-03-15",paid:false,invoiceId:"INV-004"},
  {id:"t8", type:"expense",amount:3500, desc:"Salaires",           client:"",             date:"2025-03-20",paid:true, invoiceId:null},
  {id:"t9", type:"income", amount:6200, desc:"Projet site web",    client:"Innova SARL",  date:"2025-03-22",paid:true, invoiceId:"INV-005"},
  {id:"t10",type:"income", amount:9000, desc:"Vente matériel",     client:"Acme Corp",    date:"2025-02-10",paid:true, invoiceId:"INV-006"},
  {id:"t11",type:"income", amount:4500, desc:"Support technique",  client:"SoftTech",     date:"2025-02-18",paid:true, invoiceId:"INV-007"},
  {id:"t12",type:"income", amount:7200, desc:"Commande bulk",      client:"BioMart",      date:"2025-01-15",paid:true, invoiceId:"INV-008"},
  {id:"t13",type:"income", amount:3800, desc:"Formation",          client:"Innova SARL",  date:"2025-02-05",paid:true, invoiceId:"INV-009"},
  {id:"t14",type:"income", amount:2500, desc:"Pièces détachées",   client:"Khalid & Fils",date:"2025-01-20",paid:true, invoiceId:"INV-010"},
];
const DEMO_PRODUCTS=[
  {id:"p1",name:"Consultation 1h",   price:5000,stock:null},
  {id:"p2",name:"Maintenance mens.", price:3000,stock:null},
  {id:"p3",name:"Développement web", price:15000,stock:null},
  {id:"p4",name:"Samsung A14",       price:32000,stock:12},
  {id:"p5",name:"Câble USB-C",       price:800,  stock:50},
  {id:"p6",name:"Livraison express", price:500,  stock:null},
];
const DEMO_INVOICES=[
  {id:"INV-001",customer:"Acme Corp",    lines:[{name:"Samsung A14",price:32000,qty:1}],                          total:12500,payStatus:"paid",   paidAmount:12500,date:"2025-03-01"},
  {id:"INV-002",customer:"SoftTech",     lines:[{name:"Consultation 1h",price:5000,qty:1}],                      total:8000, payStatus:"unpaid", paidAmount:0,    date:"2025-03-05"},
  {id:"INV-003",customer:"BioMart",      lines:[{name:"Câble USB-C",price:800,qty:2}],                           total:5500, payStatus:"unpaid", paidAmount:0,    date:"2025-03-10"},
  {id:"INV-004",customer:"Khalid & Fils",lines:[{name:"Maintenance mens.",price:3000,qty:1}],                    total:3000, payStatus:"unpaid", paidAmount:0,    date:"2025-03-15"},
  {id:"INV-005",customer:"Innova SARL",  lines:[{name:"Développement web",price:15000,qty:1}],                   total:6200, payStatus:"paid",   paidAmount:6200, date:"2025-03-22"},
  {id:"INV-006",customer:"Acme Corp",    lines:[{name:"Samsung A14",price:32000,qty:1}],                          total:9000, payStatus:"paid",   paidAmount:9000, date:"2025-02-10"},
  {id:"INV-007",customer:"SoftTech",     lines:[{name:"Consultation 1h",price:5000,qty:2}],                      total:4500, payStatus:"paid",   paidAmount:4500, date:"2025-02-18"},
  {id:"INV-008",customer:"BioMart",      lines:[{name:"Câble USB-C",price:800,qty:4},{name:"Samsung A14",price:32000,qty:1}],total:7200,payStatus:"paid",paidAmount:7200,date:"2025-01-15"},
  {id:"INV-009",customer:"Innova SARL",  lines:[{name:"Développement web",price:15000,qty:1}],                   total:3800, payStatus:"paid",   paidAmount:3800, date:"2025-02-05"},
  {id:"INV-010",customer:"Khalid & Fils",lines:[{name:"Maintenance mens.",price:3000,qty:1}],                    total:2500, payStatus:"paid",   paidAmount:2500, date:"2025-01-20"},
];
/* ═══════════════════════════════════════════════
   SUPABASE CLIENT
═══════════════════════════════════════════════ */
const SB_URL="https://tbsdvvmoyhyszqwkgbjl.supabase.co";
const SB_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRic2R2dm1veWh5c3pxd2tnYmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5MDY1NzUsImV4cCI6MjA5MDQ4MjU3NX0.xgIjslaIeUocxGDXutn9OforeHE6uY_zydP8Xk0fzcU";

const sbFetch=async(path,opts={})=>{
  const headers={
    "apikey":SB_KEY,
    "Authorization":`Bearer ${SB_KEY}`,
    "Content-Type":"application/json",
    "Prefer":"return=representation",
    ...(opts.headers||{}),
  };
  const res=await fetch(`${SB_URL}/rest/v1/${path}`,{...opts,headers});
  if(!res.ok){const e=await res.text();throw new Error(e);}
  const txt=await res.text();
  return txt?JSON.parse(txt):null;
};

// ── حسابات ──
const getAccounts=async()=>{
  try{const r=await sbFetch("fbz_accounts?select=*");return Object.fromEntries((r||[]).map(a=>[a.username,{password:a.password,shopName:a.shop_name,refCode:a.ref_code,createdAt:a.created_at}]));}
  catch{return {};}
};
const getAccount=async u=>{
  try{const r=await sbFetch(`fbz_accounts?username=eq.${encodeURIComponent(u)}&select=*`);return r?.[0]||null;}
  catch{return null;}
};
const createAccount=async(u,password,shopName,refCode)=>{
  await sbFetch("fbz_accounts",{method:"POST",body:JSON.stringify({username:u,password,shop_name:shopName,ref_code:refCode})});
};

// ── بيانات المستخدم ──
const getUserData=async u=>{
  try{const r=await sbFetch(`fbz_user_data?username=eq.${encodeURIComponent(u)}&select=data`);return r?.[0]?.data||null;}
  catch{return null;}
};
const saveUserData=async(u,data)=>{
  await sbFetch("fbz_user_data",{method:"POST",headers:{"Prefer":"resolution=merge-duplicates"},body:JSON.stringify({username:u,data,updated_at:new Date().toISOString()})});
};

// ── أكواد التفعيل ──
const getCodes=async()=>{
  try{const r=await sbFetch("fbz_codes?select=*");return Object.fromEntries((r||[]).map(c=>[c.code,{used:c.used,usedBy:c.used_by,usedAt:c.used_at,createdAt:c.created_at}]));}
  catch{return {};}
};
const saveCode=async(code,obj)=>{
  await sbFetch("fbz_codes",{method:"POST",headers:{"Prefer":"resolution=merge-duplicates"},body:JSON.stringify({code,used:obj.used,used_by:obj.usedBy||null,used_at:obj.usedAt||null,created_at:obj.createdAt})});
};
const deleteCode=async code=>{
  await sbFetch(`fbz_codes?code=eq.${encodeURIComponent(code)}`,{method:"DELETE"});
};
const isCodeValid=async code=>{
  try{const r=await sbFetch(`fbz_codes?code=eq.${encodeURIComponent(code?.trim().toUpperCase())}&select=used`);return r?.[0]&&!r[0].used;}
  catch{return false;}
};
const consumeCode=async(code,username)=>{
  await sbFetch(`fbz_codes?code=eq.${encodeURIComponent(code.trim().toUpperCase())}`,{method:"PATCH",body:JSON.stringify({used:true,used_by:username,used_at:new Date().toISOString()})});
};

// ── الإحالات ──
const getReferrals=async()=>{
  try{const r=await sbFetch("fbz_referrals?select=*&order=date.desc");
  return (r||[]).map(x=>({referrer:x.referrer,newUser:x.new_user,date:x.date,ccp:x.ccp,whatsapp:x.whatsapp,seenByReferrer:x.seen_by_referrer,seenByAdmin:x.seen_by_admin,paidByAdmin:x.paid_by_admin,paidAt:x.paid_at}));}
  catch{return [];}
};
const addReferral=async obj=>{
  await sbFetch("fbz_referrals",{method:"POST",body:JSON.stringify({referrer:obj.referrer,new_user:obj.newUser,ccp:"",whatsapp:"",seen_by_referrer:false,seen_by_admin:false})});
};
const markRefSeenByReferrer=async newUser=>{
  await sbFetch(`fbz_referrals?new_user=eq.${encodeURIComponent(newUser)}`,{method:"PATCH",body:JSON.stringify({seen_by_referrer:true})});
};
const markRefSeenByAdmin=async newUser=>{
  await sbFetch(`fbz_referrals?new_user=eq.${encodeURIComponent(newUser)}`,{method:"PATCH",body:JSON.stringify({seen_by_admin:true})});
};
const markRefPaid=async newUser=>{
  await sbFetch(`fbz_referrals?new_user=eq.${encodeURIComponent(newUser)}`,{method:"PATCH",body:JSON.stringify({paid_by_admin:true,paid_at:new Date().toISOString()})});
};
const setRefCCP=async(newUser,ccp,wa)=>{
  await sbFetch(`fbz_referrals?new_user=eq.${encodeURIComponent(newUser)}`,{method:"PATCH",body:JSON.stringify({ccp,whatsapp:wa})});
};

// ── إعدادات المدير (واتساب) ──
const getAdminWA=async()=>{
  try{const r=await sbFetch("fbz_settings?key=eq.admin_wa&select=value");return r?.[0]?.value||"";}
  catch{return "";}
};
const setAdminWA=async n=>{
  await sbFetch("fbz_settings",{method:"POST",headers:{"Prefer":"resolution=merge-duplicates"},body:JSON.stringify({key:"admin_wa",value:n})});
};

/* ═══════════════════════════════════════════════
   CALCUL DROIT DE TIMBRE — LF 2025 Art. 100
   ≤300 DA: exonéré | 300-30000: 1% | 30001-100000: 1.5% | >100000: 2%
   Minimum: 5 DA — paiement électronique: exonéré
═══════════════════════════════════════════════ */
const calcTimbre=(montantTTC)=>{
  if(montantTTC<=300) return 0;
  let timbre=0;
  if(montantTTC<=30000) timbre=montantTTC*0.01;
  else if(montantTTC<=100000) timbre=montantTTC*0.015;
  else timbre=montantTTC*0.02;
  return Math.max(5,Math.ceil(timbre));
};

/* ═══════════════════════════════════════════════
   AFFILIATE — نظام رابط الدعوة
═══════════════════════════════════════════════ */
const REF_KEY="fbz_ref"; // localStorage فقط للـ ref URL
const genRefCode=u=>{
  const p=(u.replace(/[^a-z0-9]/gi,"").slice(0,4)||"user").toUpperCase();
  return `${p}-${Math.floor(1000+Math.random()*9000)}`;
};

const getUrlRef=()=>{
  try{
    const sp=new URLSearchParams(window.location.search);
    const fromSearch=sp.get("ref");
    if(fromSearch) return fromSearch;
    const hash=window.location.hash||"";
    const hm=hash.match(/ref=([^&]+)/);
    if(hm) return hm[1];
    return localStorage.getItem(REF_KEY)||"";
  }catch{return localStorage.getItem(REF_KEY)||"";}
};
const setUrlRef=ref=>{try{localStorage.setItem(REF_KEY,ref);}catch{}};
const clearUrlRef=()=>{try{localStorage.removeItem(REF_KEY);}catch{}};

const buildRefLink=refCode=>{
  try{
    const base=window.location.href.split("?")[0].split("#")[0];
    return `${base}#ref=${refCode}`;
  }catch{return `#ref=${refCode}`;}
};

const EMPTY_DATA=()=>({txs:[],products:[],invoices:[],customers:[],companyName:""});

/* ═══════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════ */
const fmt=(n,lang)=>new Intl.NumberFormat(lang==="ar"?"ar-DZ":"fr-DZ",{maximumFractionDigits:0}).format(Math.abs(n||0))+" DA";
const today=()=>new Date().toISOString().split("T")[0];
const uid=()=>Date.now()+Math.random().toString(36).slice(2,6);
const S={ // shared inline styles
  card:(extra={})=>({background:"#fff",borderRadius:16,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,.06)",...extra}),
  inp:(extra={})=>({width:"100%",fontSize:14,padding:"10px 12px",border:"1.5px solid #e5e7eb",borderRadius:10,outline:"none",boxSizing:"border-box",background:"#fff",...extra}),
  pill:(bg,c)=>({display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",background:bg,borderRadius:20,fontSize:11,fontWeight:700,color:c}),
};

/* ═══════════════════════════════════════════════
   AVATAR
═══════════════════════════════════════════════ */
const AVATARS=["#6366f1","#8b5cf6","#ec4899","#f59e0b","#10b981","#3b82f6","#ef4444","#06b6d4"];
function Avatar({name,size=36}){
  const idx=(name||"?").charCodeAt(0)%AVATARS.length;
  return(
    <div style={{width:size,height:size,borderRadius:size/3,background:AVATARS[idx],display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"#fff",fontWeight:800,fontSize:size*0.38}}>
      {(name||"?")[0].toUpperCase()}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SPARK CHART
═══════════════════════════════════════════════ */
function Bars({txs}){
  const mo=["J","F","M","A","M","J","J","A","S","O","N","D"];
  const now=new Date().getMonth();
  const data=mo.map((_,i)=>({
    i:txs.filter(t=>t.type==="income"&&t.paid&&new Date(t.date).getMonth()===i).reduce((s,t)=>s+t.amount,0),
    e:txs.filter(t=>t.type==="expense"&&new Date(t.date).getMonth()===i).reduce((s,t)=>s+t.amount,0),
  }));
  const max=Math.max(...data.map(d=>Math.max(d.i,d.e)),1);
  const H=48;
  return(
    <div style={{display:"flex",alignItems:"flex-end",gap:3,height:H+14}}>
      {data.map((d,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
          <div style={{width:"100%",display:"flex",gap:1,alignItems:"flex-end",height:H}}>
            <div style={{flex:1,height:d.i?`${(d.i/max)*H}px`:2,background:i===now?"#10B981":"#d1fae5",borderRadius:"2px 2px 0 0",transition:"height .5s"}}/>
            <div style={{flex:1,height:d.e?`${(d.e/max)*H}px`:2,background:i===now?"#ef4444":"#fee2e2",borderRadius:"2px 2px 0 0",transition:"height .5s"}}/>
          </div>
          <span style={{fontSize:8,color:i===now?"#2563EB":"#9ca3af",fontWeight:i===now?700:400}}>{mo[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MINI SPEND CHART (customer detail)
═══════════════════════════════════════════════ */
function MiniSpendChart({customerInvoices}){
  const mo=["J","F","M","A","M","J","J","A","S","O","N","D"];
  const data=mo.map((_,i)=>customerInvoices.filter(inv=>new Date(inv.date).getMonth()===i).reduce((s,inv)=>s+inv.total,0));
  const max=Math.max(...data,1);
  const H=36;
  const now=new Date().getMonth();
  return(
    <div style={{display:"flex",alignItems:"flex-end",gap:2,height:H+12}}>
      {data.map((v,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
          <div style={{width:"100%",height:v?`${(v/max)*H}px`:2,background:i===now?"#6366f1":"#e0e7ff",borderRadius:"2px 2px 0 0",transition:"height .4s"}}/>
          <span style={{fontSize:7,color:i===now?"#6366f1":"#c4b5fd"}}>{mo[i]}</span>
        </div>
      ))}
    </div>
  );
}

const genCode=()=>{
  const seg=()=>Math.random().toString(36).slice(2,6).toUpperCase();
  return `${seg()}-${seg()}`;
};

/* ─── ADMIN PANEL ─────────────────────────────── */
function AdminPanel({onClose,lang}){
  const t=T[lang],rtl=lang==="ar";
  const [codes,setCodes]=useState({});
  const [newCount,setNewCount]=useState(1);
  const [copied,setCopied]=useState("");
  const [waNum,setWaNum]=useState("");
  const [waSaved,setWaSaved]=useState(false);
  const [loading,setLoading]=useState(true);

  // تحميل البيانات من Supabase
  useEffect(()=>{
    (async()=>{
      const [c,wa]=await Promise.all([getCodes(),getAdminWA()]);
      setCodes(c); setWaNum(wa); setLoading(false);
    })();
  },[]);

  const saveWA=async()=>{
    if(!waNum.trim()) return;
    await setAdminWA(waNum.trim());
    setWaSaved(true);
    setTimeout(()=>setWaSaved(false),2000);
  };

  const refresh=async()=>{const c=await getCodes();setCodes(c);};

  const generate=async()=>{
    setLoading(true);
    const existing=await getCodes();
    for(let i=0;i<newCount;i++){
      let code=genCode();
      while(existing[code]) code=genCode();
      await saveCode(code,{used:false,createdAt:new Date().toISOString()});
    }
    await refresh();
    setLoading(false);
  };

  const revoke=async code=>{
    await deleteCode(code);
    await refresh();
  };

  const copy=code=>{
    try{
      const ta=document.createElement("textarea");
      ta.value=code;
      ta.style.cssText="position:fixed;top:0;left:0;opacity:0;pointer-events:none";
      document.body.appendChild(ta); ta.focus(); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }catch(e){}
    setCopied(code);
    setTimeout(()=>setCopied(""),2500);
  };

  const allCodes=Object.entries(codes).sort((a,b)=>new Date(b[1].createdAt)-new Date(a[1].createdAt));
  const unused=allCodes.filter(([,v])=>!v.used);
  const used=allCodes.filter(([,v])=>v.used);

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.6)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:400,backdropFilter:"blur(6px)"}}>
      <div onClick={e=>e.stopPropagation()} dir={rtl?"rtl":"ltr"}
        style={{background:"#fff",borderRadius:"22px 22px 0 0",width:"100%",maxWidth:480,maxHeight:"90svh",display:"flex",flexDirection:"column",animation:"up .22s cubic-bezier(.22,1,.36,1)"}}>

        {/* Header */}
        <div style={{padding:"18px 20px 14px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🔑</div>
            <div>
              <div style={{fontWeight:900,fontSize:16,color:"#111"}}>Codes d'activation</div>
              <div style={{fontSize:11,color:"#9ca3af"}}>{unused.length} disponible(s) · {used.length} utilisé(s)</div>
            </div>
          </div>
          <button onClick={onClose} style={{background:"#f3f4f6",border:"none",width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:18,color:"#6b7280",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>

        <div style={{overflowY:"auto",flex:1,padding:"16px 20px"}}>

          {/* رقم واتساب */}
          <div style={{background:"#f0fdf4",borderRadius:14,padding:14,marginBottom:20,border:"1px solid #a7f3d0"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#065f46",marginBottom:10}}>📞 Mon numéro WhatsApp</div>
            <div style={{display:"flex",gap:8}}>
              <input
                value={waNum}
                onChange={e=>setWaNum(e.target.value.replace(/\D/g,""))}
                placeholder="213661234567"
                style={{flex:1,padding:"9px 12px",border:"1.5px solid #a7f3d0",borderRadius:10,fontSize:15,fontWeight:700,outline:"none",fontFamily:"monospace",letterSpacing:1}}
              />
              <button onClick={saveWA}
                style={{padding:"9px 16px",background:waSaved?"#059669":"#10B981",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:800,cursor:"pointer",minWidth:70,transition:"background .2s"}}>
                {waSaved?"✓ OK":"Sauver"}
              </button>
            </div>
            <div style={{fontSize:11,color:"#6b7280",marginTop:6}}>
              Format international sans + · Ex: <span style={{fontFamily:"monospace",fontWeight:700}}>213661234567</span>
            </div>
            {waNum&&<a href={`https://wa.me/${waNum}`} target="_blank" rel="noreferrer"
              style={{display:"inline-block",marginTop:8,fontSize:12,color:"#25D366",fontWeight:700,textDecoration:"none"}}>
              ✓ Tester le lien WhatsApp →
            </a>}
          </div>

          {/* Générer */}
          <div style={{background:"#f0f9ff",borderRadius:14,padding:14,marginBottom:20,border:"1px solid #bae6fd"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#0369a1",marginBottom:10}}>Générer des codes</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <div style={{display:"flex",gap:4}}>
                {[1,3,5,10].map(n=>(
                  <button key={n} onClick={()=>setNewCount(n)}
                    style={{padding:"6px 12px",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:700,background:newCount===n?"#2563EB":"#e5e7eb",color:newCount===n?"#fff":"#374151"}}>
                    {n}
                  </button>
                ))}
              </div>
              <button onClick={generate}
                style={{flex:1,padding:"10px",background:"#2563EB",color:"#fff",border:"none",borderRadius:10,fontSize:14,fontWeight:800,cursor:"pointer"}}>
                ➕ Générer
              </button>
            </div>
          </div>

          {/* Codes disponibles */}
          {unused.length>0&&(
            <div style={{marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8,marginBottom:10}}>
                ✅ Codes disponibles ({unused.length})
              </div>
              {unused.map(([code,info])=>(
                <div key={code} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",background:"#f9fafb",borderRadius:12,marginBottom:6,border:"1px solid #e5e7eb"}}>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"monospace",fontWeight:900,fontSize:17,color:"#111",letterSpacing:2}}>{code}</div>
                    <div style={{fontSize:11,color:"#9ca3af"}}>{new Date(info.createdAt).toLocaleDateString()}</div>
                  </div>
                  <button onClick={()=>copy(code)}
                    style={{padding:"6px 12px",background:copied===code?"#ecfdf5":"#eff6ff",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",color:copied===code?"#065f46":"#1d4ed8"}}>
                    {copied===code?"✓ Copié":"📋 Copier"}
                  </button>
                  <button onClick={()=>revoke(code)}
                    style={{padding:"6px 10px",background:"#fef2f2",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",color:"#dc2626"}}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {unused.length===0&&(
            <div style={{textAlign:"center",padding:"20px 0",color:"#9ca3af",fontSize:14}}>
              Aucun code disponible — générez-en ci-dessus
            </div>
          )}

          {/* Codes utilisés */}
          {used.length>0&&(
            <div style={{marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8,marginBottom:10}}>
                🔒 Codes utilisés ({used.length})
              </div>
              {used.map(([code,info])=>(
                <div key={code} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",background:"#f9fafb",borderRadius:10,marginBottom:4,opacity:.6}}>
                  <div style={{fontFamily:"monospace",fontWeight:700,fontSize:14,color:"#9ca3af",letterSpacing:1,flex:1}}>{code}</div>
                  <div style={{fontSize:11,color:"#9ca3af",textAlign:"right"}}>
                    <div>@{info.usedBy}</div>
                    <div>{info.usedAt?new Date(info.usedAt).toLocaleDateString():""}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Parrainages */}
          <AdminReferrals/>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ADMIN REFERRALS — component منفصل لتجنب hook في IIFE
═══════════════════════════════════════════════ */
function AdminReferrals(){
  const [refs,setRefs]=useState([]);
  const [search,setSearch]=useState("");
  const [confirmPay,setConfirmPay]=useState(null);
  useEffect(()=>{getReferrals().then(setRefs);},[]);

  const filtered=refs.filter(r=>
    r.referrer?.toLowerCase().includes(search.toLowerCase())||
    r.newUser?.toLowerCase().includes(search.toLowerCase())||
    r.ccp?.includes(search)||
    r.whatsapp?.includes(search)
  );

  const handlePay=async(r)=>{
    await markRefPaid(r.newUser);
    await markRefSeenByAdmin(r.newUser);
    setRefs(prev=>prev.map(x=>x.newUser===r.newUser?{...x,paidByAdmin:true,paidAt:new Date().toISOString(),seenByAdmin:true}:x));
    setConfirmPay(null);
  };

  const exportExcel=()=>{
    const rows=[
      ["Parrain","Invité","Date","CCP","WhatsApp","Payé","Date paiement"],
      ...refs.map(r=>[r.referrer||"",r.newUser||"",r.date?new Date(r.date).toLocaleDateString("fr-FR"):"",r.ccp||"",r.whatsapp||"",r.paidByAdmin?"Oui":"Non",r.paidAt?new Date(r.paidAt).toLocaleDateString("fr-FR"):""])
    ];
    const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url; a.download=`parrainages_${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const paid=refs.filter(r=>r.paidByAdmin).length;
  const unpaid=refs.filter(r=>r.ccp&&!r.paidByAdmin).length;

  return(
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8}}>🔗 Parrainages ({refs.length})</div>
        {refs.length>0&&<button onClick={exportExcel} style={{padding:"5px 12px",background:"#059669",color:"#fff",border:"none",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer"}}>📊 Export CSV</button>}
      </div>
      {refs.length>0&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:12}}>
          {[{l:"Total",v:refs.length,bg:"#eff6ff",c:"#1d4ed8"},{l:"Payés",v:paid,bg:"#ecfdf5",c:"#059669"},{l:"En attente",v:unpaid,bg:"#fffbeb",c:"#d97706"}].map(s=>(
            <div key={s.l} style={{background:s.bg,borderRadius:10,padding:"8px",textAlign:"center"}}>
              <div style={{fontWeight:900,fontSize:18,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:s.c,fontWeight:700}}>{s.l}</div>
            </div>
          ))}
        </div>
      )}
      {refs.length>0&&<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un nom, CCP, WhatsApp..." style={{...S.inp({marginBottom:12,fontSize:13})}}/>}
      {filtered.length===0&&refs.length>0&&<div style={{textAlign:"center",padding:"12px 0",color:"#9ca3af",fontSize:13}}>Aucun résultat</div>}
      {filtered.length===0&&refs.length===0&&<div style={{textAlign:"center",padding:"12px 0",color:"#9ca3af",fontSize:13}}>Aucun parrainage</div>}
      {filtered.map((r,i)=>(
        <div key={i} style={{padding:"14px",background:r.paidByAdmin?"#f0fdf4":r.seenByAdmin?"#f9fafb":"#eff6ff",borderRadius:12,marginBottom:10,border:`1.5px solid ${r.paidByAdmin?"#86efac":r.seenByAdmin?"#e5e7eb":"#bfdbfe"}`}}>
          <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
            {!r.seenByAdmin&&<span style={{fontSize:10,background:"#2563EB",color:"#fff",borderRadius:20,padding:"2px 8px",fontWeight:700}}>🆕 NOUVEAU</span>}
            {r.paidByAdmin&&<span style={{fontSize:10,background:"#059669",color:"#fff",borderRadius:20,padding:"2px 8px",fontWeight:700}}>✅ PAYÉ — {r.paidAt?new Date(r.paidAt).toLocaleDateString("fr-FR"):""}</span>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <div style={{flex:1,background:"#fff",borderRadius:10,padding:"8px 12px",border:"1px solid #e5e7eb"}}>
              <div style={{fontSize:10,color:"#9ca3af",fontWeight:700,marginBottom:2}}>PARRAIN</div>
              <div style={{fontWeight:800,fontSize:14,color:"#2563EB"}}>@{r.referrer}</div>
            </div>
            <div style={{fontSize:18,color:"#9ca3af"}}>→</div>
            <div style={{flex:1,background:"#fff",borderRadius:10,padding:"8px 12px",border:"1px solid #e5e7eb"}}>
              <div style={{fontSize:10,color:"#9ca3af",fontWeight:700,marginBottom:2}}>INVITÉ</div>
              <div style={{fontWeight:800,fontSize:14,color:"#111"}}>@{r.newUser}</div>
            </div>
          </div>
          <div style={{fontSize:11,color:"#9ca3af",marginBottom:8}}>📅 {new Date(r.date).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"})}</div>
          {r.ccp?(
            <div style={{background:r.paidByAdmin?"#dcfce7":"#ecfdf5",borderRadius:10,padding:"10px 12px",border:`1px solid ${r.paidByAdmin?"#86efac":"#a7f3d0"}`,marginBottom:10}}>
              <div style={{display:"flex",gap:16}}>
                <div><div style={{fontSize:10,color:"#065f46",fontWeight:700,marginBottom:2}}>💳 CCP</div><div style={{fontWeight:800,fontSize:15,color:"#065f46",fontFamily:"monospace"}}>{r.ccp}</div></div>
                <div><div style={{fontSize:10,color:"#065f46",fontWeight:700,marginBottom:2}}>📞 WHATSAPP</div><div style={{fontWeight:800,fontSize:15,color:"#065f46"}}>{r.whatsapp}</div></div>
              </div>
            </div>
          ):(
            <div style={{background:"#fffbeb",borderRadius:10,padding:"8px 12px",border:"1px solid #fde68a",fontSize:12,color:"#92400e",fontWeight:600,marginBottom:10}}>⏳ En attente des coordonnées du parrain</div>
          )}
          {r.ccp&&!r.paidByAdmin&&(
            <button onClick={()=>{markRefSeenByAdmin(r.newUser);setRefs(prev=>prev.map(x=>x.newUser===r.newUser?{...x,seenByAdmin:true}:x));setConfirmPay(r);}}
              style={{width:"100%",padding:"9px",background:"#2563EB",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:800,cursor:"pointer"}}>✓ Confirmer le paiement</button>
          )}
        </div>
      ))}
      {confirmPay&&(
        <div onClick={()=>setConfirmPay(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,backdropFilter:"blur(4px)",padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:340,boxShadow:"0 24px 64px rgba(0,0,0,.25)",animation:"up .2s cubic-bezier(.22,1,.36,1)"}}>
            <div style={{fontSize:40,textAlign:"center",marginBottom:12}}>💰</div>
            <div style={{fontWeight:900,fontSize:16,color:"#111",marginBottom:8,textAlign:"center"}}>Confirmer le paiement ?</div>
            <div style={{background:"#f9fafb",borderRadius:12,padding:"12px",marginBottom:20,fontSize:13}}>
              <div style={{marginBottom:6}}><b>Parrain:</b> @{confirmPay.referrer}</div>
              <div style={{marginBottom:6}}><b>CCP:</b> {confirmPay.ccp}</div>
              <div><b>WhatsApp:</b> {confirmPay.whatsapp}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:10}}>
              <button onClick={()=>setConfirmPay(null)} style={{padding:13,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>Annuler</button>
              <button onClick={()=>handlePay(confirmPay)} style={{padding:13,borderRadius:12,border:"none",fontSize:14,fontWeight:800,color:"#fff",background:"#059669",cursor:"pointer"}}>✓ Oui, payé</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   AUTH SCREEN  (تسجيل + دخول)
═══════════════════════════════════════════════ */
function Auth({onLogin,lang,setLang}){
  const t=T[lang],rtl=lang==="ar";
  const [mode,setMode]=useState("login");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [activCode,setActivCode]=useState("");
  const [err,setErr]=useState("");
  const [success,setSuccess]=useState("");
  const [showAdmin,setShowAdmin]=useState(false);

  // التسلسل السري: logo×5 → key×2 → logo×1 → key×1 → password
  // seq: 0=start | 1=logo5done | 2=key1 | 3=key2 | 4=logo6done | 5=show_pass
  const [seq,setSeq]=useState(0);
  const [adminPass,setAdminPass]=useState("");
  const [adminErr,setAdminErr]=useState(false);
  const tapsRef=useState({logo:[],lastLogoSeq:-1})[0];

  const handleLogoClic=()=>{
    const now=Date.now();
    tapsRef.logo.push(now);
    while(tapsRef.logo.length>0&&now-tapsRef.logo[0]>4000) tapsRef.logo.shift();

    if(seq===0&&tapsRef.logo.length>=5){
      // 5 نقرات على الشعار → المرحلة 1
      tapsRef.logo=[];
      setSeq(1);
    } else if(seq===3){
      // نقرة واحدة على الشعار بعد key×2 → المرحلة 4
      tapsRef.logo=[];
      setSeq(4);
    }
  };

  const handleKeyBtn=()=>{
    if(seq===1){ setSeq(2); }       // ضغطة أولى على المفتاح
    else if(seq===2){ setSeq(3); }  // ضغطة ثانية على المفتاح
    else if(seq===4){ setSeq(5); }  // ضغطة أخيرة → يظهر حقل كلمة السر
    // أي ضغط خارج التسلسل: لا شيء
  };

  const tryAdmin=()=>{
    if(adminPass==="flowbiz-admin-2025"){
      setAdminPass("");setSeq(0);setShowAdmin(true);
    } else {
      setAdminErr(true);
      setTimeout(()=>{setAdminErr(false);setAdminPass("");setSeq(0);},1500);
    }
  };

  const [loading,setLoading]=useState(false);

  const showErr=msg=>{setErr(msg);setTimeout(()=>setErr(""),3000);};

  const handleLogin=async()=>{
    if(!username.trim()||!password.trim()){showErr(t.fieldRequired);return;}
    setLoading(true);
    try{
      const u=username.trim().toLowerCase();
      const acc=await getAccount(u);
      if(!acc||acc.password!==password){showErr(t.wrongCreds);setLoading(false);return;}
      // migration: génère refCode si absent
      if(!acc.ref_code){
        const rc=genRefCode(u);
        await sbFetch(`fbz_accounts?username=eq.${encodeURIComponent(u)}`,{method:"PATCH",body:JSON.stringify({ref_code:rc})});
        acc.ref_code=rc;
      }
      const data=await getUserData(u)||EMPTY_DATA();
      onLogin({username:u,shopName:acc.shop_name,refCode:acc.ref_code},data);
    }catch(e){showErr(t.wrongCreds);}
    setLoading(false);
  };

  const [refCode,setRefCode]=useState(()=>{
    const urlRef=getUrlRef();
    if(urlRef) setUrlRef(urlRef);
    return urlRef;
  });

  useEffect(()=>{
    const onHash=()=>{
      const ref=getUrlRef();
      if(ref){setUrlRef(ref);setRefCode(ref);setMode("register");}
    };
    window.addEventListener("hashchange",onHash);
    return ()=>window.removeEventListener("hashchange",onHash);
  },[]);

  const handleRegister=async()=>{
    const u=username.trim().toLowerCase();
    if(!u||!password||!activCode.trim()){showErr(t.fieldRequired);return;}
    if(password.length<6){showErr(t.passShort);return;}
    if(password!==confirm){showErr(t.passMismatch);return;}
    setLoading(true);
    try{
      const valid=await isCodeValid(activCode.trim().toUpperCase());
      if(!valid){showErr(t.invalidCode);setLoading(false);return;}
      const existing=await getAccount(u);
      if(existing){showErr(t.userExists);setLoading(false);return;}
      // معالجة كود الدعوة
      const rc=refCode.trim().toUpperCase();
      if(rc){
        const allAccs=await getAccounts();
        const referrerEntry=Object.entries(allAccs).find(([,v])=>v.refCode===rc);
        if(!referrerEntry){showErr(t.refCodeInvalid);setLoading(false);return;}
        await addReferral({referrer:referrerEntry[0],newUser:u});
      }
      await consumeCode(activCode.trim().toUpperCase(),u);
      const myRefCode=genRefCode(u);
      await createAccount(u,password,u,myRefCode);
      await saveUserData(u,EMPTY_DATA());
      clearUrlRef();
      setSuccess(t.accountCreated);
      setTimeout(()=>{setSuccess("");setMode("login");setPassword("");setConfirm("");setActivCode("");setRefCode("");},1800);
    }catch(e){showErr("Erreur — réessayez");}
    setLoading(false);
  };

  const launchDemo=async()=>{
    setLoading(true);
    try{
      let acc=await getAccount("demo");
      if(!acc){
        await createAccount("demo","demo","Démo Commerce","DEMO-0000");
        const d=EMPTY_DATA();
        d.txs=DEMO_TXS;d.products=DEMO_PRODUCTS;d.invoices=DEMO_INVOICES;d.customers=DEMO_CUSTOMERS_RAW;d.companyName="Démo Commerce";
        await saveUserData("demo",d);
        acc={username:"demo",shop_name:"Démo Commerce",ref_code:"DEMO-0000"};
      }
      const data=await getUserData("demo")||EMPTY_DATA();
      onLogin({username:"demo",shopName:acc.shop_name,refCode:acc.ref_code},data);
    }catch(e){showErr("Erreur démo");}
    setLoading(false);
  };

  const inp=extra=>S.inp({marginBottom:10,...extra});

  return(
    <div dir={rtl?"rtl":"ltr"} style={{minHeight:"100svh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"linear-gradient(160deg,#1d4ed8,#2563EB)",padding:20,overflowY:"auto"}}>

      {/* LOGO — المرحلة 1: 5 نقرات */}
      <div style={{textAlign:"center",marginBottom:24,cursor:"default",userSelect:"none"}} onClick={handleLogoClic}>
        <div style={{fontSize:48,marginBottom:6}}>💼</div>
        <div style={{fontSize:30,fontWeight:900,color:"#fff",letterSpacing:"-1px"}}>{t.appName}</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.7)",marginTop:4}}>
          {mode==="login"?t.loginTitle:t.createAccount}
        </div>
      </div>

      {/* CARD */}
      <div style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:360,boxShadow:"0 24px 64px rgba(0,0,0,.25)"}}>

        {/* بانر الدعوة إذا جاء عبر رابط */}
        {refCode&&mode==="register"&&(
          <div style={{background:"linear-gradient(135deg,#eff6ff,#dbeafe)",borderRadius:14,padding:"14px 16px",marginBottom:18,textAlign:"center",border:"1px solid #bfdbfe"}}>
            <div style={{fontSize:22,marginBottom:6}}>🎉</div>
            <div style={{fontWeight:800,fontSize:14,color:"#1d4ed8",marginBottom:4}}>Invitation reçue !</div>
            <div style={{fontSize:12,color:"#3730a3",lineHeight:1.5}}>
              Inscrivez-vous et contactez le développeur pour activer votre compte.<br/>
              <a href={`https://wa.me/${getAdminWA()}`} target="_blank" rel="noreferrer"
                style={{color:"#25D366",fontWeight:700,textDecoration:"none"}}>📞 Contacter via WhatsApp</a>
            </div>
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,background:"#f3f4f6",borderRadius:12,padding:4,marginBottom:20}}>
          {[["login",t.loginTitle],["register",t.createAccount]].map(([m,label])=>(
            <button key={m} onClick={()=>{setMode(m);setErr("");}} style={{padding:"9px 0",borderRadius:9,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:mode===m?"#2563EB":"transparent",color:mode===m?"#fff":"#6b7280",transition:"all .15s"}}>{label}</button>
          ))}
        </div>
        {err&&<div style={{background:"#fef2f2",color:"#b91c1c",borderRadius:9,padding:"9px 12px",fontSize:13,marginBottom:12,textAlign:"center",fontWeight:600}}>{err}</div>}
        {success&&<div style={{background:"#ecfdf5",color:"#065f46",borderRadius:9,padding:"9px 12px",fontSize:13,marginBottom:12,textAlign:"center",fontWeight:600}}>{success}</div>}
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder={t.usernamePh} style={inp()} autoFocus onKeyDown={e=>e.key==="Enter"&&mode==="login"&&handleLogin()}/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={t.passwordPh} style={inp()} onKeyDown={e=>e.key==="Enter"&&mode==="login"&&handleLogin()}/>
        {mode==="register"&&<>
          <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder={t.confirmPass} style={inp()}/>
          <input value={activCode} onChange={e=>setActivCode(e.target.value.toUpperCase())}
            placeholder={t.activCodePh}
            style={inp({fontFamily:"monospace",fontWeight:700,letterSpacing:2,fontSize:16,
              borderColor:activCode.length===9?(isCodeValid(activCode)?"#10B981":"#ef4444"):"#e5e7eb"})}/>
          <input
            value={refCode}
            onChange={e=>{ if(!getUrlRef()) setRefCode(e.target.value.toUpperCase()); }}
            readOnly={!!getUrlRef()}
            placeholder={t.refCodePh}
            style={inp({marginBottom:16,fontFamily:"monospace",letterSpacing:1,
              borderColor:refCode.length>0?"#10B981":"#e5e7eb",
              borderStyle:refCode.length>0?"solid":"dashed",
              background:refCode.length>0&&getUrlRef()?"#f0fdf4":"#fff",
              color:refCode.length>0?"#065f46":"#9ca3af",
              cursor:getUrlRef()?"default":"text"
            })}
          />        </>}
        <button onClick={mode==="login"?handleLogin:handleRegister} disabled={loading}
          style={{width:"100%",padding:14,background:loading?"#93c5fd":"#2563EB",color:"#fff",border:"none",borderRadius:12,fontSize:15,fontWeight:800,cursor:loading?"default":"pointer",marginTop:mode==="login"?6:0,transition:"background .2s"}}>
          {loading?"⏳ ...":mode==="login"?t.loginBtn:t.registerBtn}
        </button>
        {mode==="login"&&<button onClick={launchDemo} disabled={loading} style={{width:"100%",padding:"10px",background:"transparent",color:"#9ca3af",border:"1px dashed #e5e7eb",borderRadius:12,fontSize:13,fontWeight:600,cursor:"pointer",marginTop:10}}>👀 Voir la démo</button>}
      </div>

      {/* ZONE BAS */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,marginTop:20}}>
        {/* Langue */}
        <div style={{display:"flex",gap:8}}>
          {["fr","ar"].map(l=><button key={l} onClick={()=>setLang(l)} style={{padding:"6px 16px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:13,background:lang===l?"#fff":"rgba(255,255,255,.2)",color:lang===l?"#2563EB":"#fff"}}>{l==="fr"?"FR":"AR"}</button>)}
        </div>

        {/* زر 🔑 — مظهر ثابت دائماً، لا يتجاوب إلا في التسلسل الصحيح */}
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button
            onClick={handleKeyBtn}
            style={{padding:"7px 16px",borderRadius:20,border:"1.5px solid rgba(255,255,255,.25)",background:"transparent",color:"rgba(255,255,255,.4)",fontSize:14,cursor:"default",fontWeight:600}}>
            🔑
          </button>

          {/* حقل كلمة السر — يظهر فقط عند اكتمال التسلسل */}
          {seq===5&&(
            <>
              <input
                autoFocus
                type="password"
                value={adminPass}
                onChange={e=>setAdminPass(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&tryAdmin()}
                placeholder="••••••••"
                style={{padding:"7px 12px",borderRadius:10,border:`1.5px solid ${adminErr?"#ef4444":"rgba(255,255,255,.35)"}`,background:"rgba(255,255,255,.12)",color:"#fff",fontSize:13,outline:"none",width:130,transition:"border-color .2s"}}
              />
              <button
                onClick={tryAdmin}
                style={{padding:"7px 12px",borderRadius:10,border:"none",background:adminErr?"rgba(239,68,68,.3)":"rgba(255,255,255,.2)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                ✓
              </button>
            </>
          )}
        </div>
      </div>

      {showAdmin&&<AdminPanel onClose={()=>setShowAdmin(false)} lang={lang}/>}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ONBOARD
═══════════════════════════════════════════════ */
function Onboard({onChoice,lang}){
  const t=T[lang],rtl=lang==="ar";
  return(
    <div dir={rtl?"rtl":"ltr"} style={{minHeight:"100svh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,background:"#f9fafb"}}>
      <div style={{textAlign:"center",marginBottom:40}}><div style={{fontSize:52,marginBottom:12}}>💼</div><div style={{fontSize:26,fontWeight:900,color:"#111",marginBottom:6}}>{t.welcome}</div><div style={{fontSize:15,color:"#6b7280"}}>{t.welcomeSub}</div></div>
      <div style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:320}}>
        <button onClick={()=>onChoice("income")} style={{padding:20,background:"#10B981",color:"#fff",border:"none",borderRadius:16,fontSize:18,fontWeight:800,cursor:"pointer",boxShadow:"0 8px 24px rgba(16,185,129,.35)"}}>+ {t.addIncome}</button>
        <button onClick={()=>onChoice("expense")} style={{padding:20,background:"#ef4444",color:"#fff",border:"none",borderRadius:16,fontSize:18,fontWeight:800,cursor:"pointer",boxShadow:"0 8px 24px rgba(239,68,68,.35)"}}>– {t.addExpense}</button>
        <button onClick={()=>onChoice("demo")} style={{padding:18,background:"#fff",color:"#374151",border:"1.5px solid #e5e7eb",borderRadius:16,fontSize:15,fontWeight:600,cursor:"pointer"}}>{t.demo}</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TX MODAL
═══════════════════════════════════════════════ */
function TxModal({initType,onSave,onClose,lang}){
  const t=T[lang],rtl=lang==="ar";
  const [type,setType]=useState(initType||"income");
  const [amt,setAmt]=useState(""), [desc,setDesc]=useState(""), [client,setCli]=useState(""), [paid,setPaid]=useState(true);
  const ok=amt&&parseFloat(amt)>0&&desc.trim();
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200,backdropFilter:"blur(6px)"}}>
      <div onClick={e=>e.stopPropagation()} dir={rtl?"rtl":"ltr"} style={{background:"#fff",borderRadius:"20px 20px 0 0",padding:"24px 20px 36px",width:"100%",maxWidth:480,animation:"up .22s cubic-bezier(.22,1,.36,1)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,background:"#f3f4f6",padding:4,borderRadius:14,marginBottom:20}}>
          {["income","expense"].map(tp=>(
            <button key={tp} onClick={()=>setType(tp)} style={{padding:"10px 0",borderRadius:10,border:"none",cursor:"pointer",fontWeight:800,fontSize:14,background:type===tp?(tp==="income"?"#10B981":"#ef4444"):"transparent",color:type===tp?"#fff":"#6b7280"}}>
              {tp==="income"?`+ ${t.addIncome}`:`– ${t.addExpense}`}
            </button>
          ))}
        </div>
        <input autoFocus type="number" placeholder="0" value={amt} onChange={e=>setAmt(e.target.value)} style={{width:"100%",fontSize:40,fontWeight:900,color:"#111",border:"none",borderBottom:"2px solid #e5e7eb",padding:"2px 0 8px",outline:"none",marginBottom:16,background:"transparent",boxSizing:"border-box"}}/>
        <input type="text" placeholder={t.descPh} value={desc} onChange={e=>setDesc(e.target.value)} style={S.inp({marginBottom:8})}/>
        <input type="text" placeholder={t.clientPh} value={client} onChange={e=>setCli(e.target.value)} style={S.inp({marginBottom:16})}/>
        {type==="income"&&(
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
            <span style={{fontSize:14,color:"#374151"}}>{t.received}</span>
            {[true,false].map(v=>(
              <button key={String(v)} onClick={()=>setPaid(v)} style={{padding:"6px 14px",borderRadius:20,border:"1.5px solid",fontSize:13,fontWeight:700,cursor:"pointer",borderColor:paid===v?(v?"#10B981":"#f59e0b"):"#e5e7eb",background:paid===v?(v?"#ecfdf5":"#fffbeb"):"transparent",color:paid===v?(v?"#065f46":"#92400e"):"#9ca3af"}}>{v?t.yes:t.no}</button>
            ))}
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:10}}>
          <button onClick={onClose} style={{padding:14,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>{t.cancel}</button>
          <button onClick={()=>{if(!ok)return;onSave({id:uid(),type,amount:parseFloat(amt),desc:desc.trim(),client:client.trim(),date:today(),paid,invoiceId:null});onClose();}}
            style={{padding:14,borderRadius:12,border:"none",fontSize:15,fontWeight:800,cursor:ok?"pointer":"default",background:ok?"#2563EB":"#e5e7eb",color:ok?"#fff":"#9ca3af"}}>{t.save}</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CUSTOMER MODAL (add/edit)
═══════════════════════════════════════════════ */
function CustomerModal({existing,onSave,onClose,lang}){
  const t=T[lang],rtl=lang==="ar";
  const [name,setName]=useState(existing?.name||"");
  const [phone,setPhone]=useState(existing?.phone||"");
  const [nif,setNif]=useState(existing?.nif||"");
  const [nis,setNis]=useState(existing?.nis||"");
  const [rc,setRc]=useState(existing?.rc||"");
  const [adresse,setAdresse]=useState(existing?.adresse||"");
  const [isProf,setIsProf]=useState(!!(existing?.nif||existing?.rc));
  const ok=name.trim();
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200,backdropFilter:"blur(6px)"}}>
      <div onClick={e=>e.stopPropagation()} dir={rtl?"rtl":"ltr"}
        style={{background:"#fff",borderRadius:"20px 20px 0 0",padding:"0",width:"100%",maxWidth:480,maxHeight:"88svh",display:"flex",flexDirection:"column",animation:"up .22s cubic-bezier(.22,1,.36,1)"}}>
        <div style={{padding:"18px 20px 14px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{fontWeight:900,fontSize:17,color:"#111"}}>{existing?t.editCustomer:t.newCustomer}</div>
          <button onClick={onClose} style={{background:"#f3f4f6",border:"none",width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:18,color:"#6b7280"}}>×</button>
        </div>
        <div style={{overflowY:"auto",flex:1,padding:"16px 20px"}}>
          <input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder={t.namePh} style={S.inp({marginBottom:10,fontSize:16,fontWeight:600})}/>
          <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder={t.phonePh} style={S.inp({marginBottom:14})}/>
          <input value={adresse} onChange={e=>setAdresse(e.target.value)} placeholder="Adresse du client" style={S.inp({marginBottom:16})}/>

          {/* Type de client */}
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,padding:"10px 14px",background:"#f9fafb",borderRadius:12}}>
            <span style={{fontSize:13,color:"#374151",fontWeight:600,flex:1}}>Client professionnel (entreprise) ?</span>
            <button onClick={()=>setIsProf(!isProf)}
              style={{padding:"5px 16px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,
                background:isProf?"#2563EB":"#e5e7eb",color:isProf?"#fff":"#6b7280"}}>
              {isProf?"Oui ✓":"Non"}
            </button>
          </div>

          {isProf&&(
            <div style={{background:"#eff6ff",borderRadius:14,padding:14,border:"1px solid #bfdbfe",marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:"#1d4ed8",marginBottom:12}}>📋 Informations légales du client</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:"#6b7280",marginBottom:4}}>NIF</div>
                  <input value={nif} onChange={e=>setNif(e.target.value)} placeholder="000316..." style={{...S.inp({fontFamily:"monospace",fontSize:13})}}/>
                </div>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:"#6b7280",marginBottom:4}}>NIS</div>
                  <input value={nis} onChange={e=>setNis(e.target.value)} placeholder="099812..." style={{...S.inp({fontFamily:"monospace",fontSize:13})}}/>
                </div>
                <div style={{gridColumn:"1/-1"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#6b7280",marginBottom:4}}>RC — Registre du Commerce</div>
                  <input value={rc} onChange={e=>setRc(e.target.value)} placeholder="16/00-0012345B19" style={{...S.inp({fontFamily:"monospace",fontSize:13})}}/>
                </div>
              </div>
            </div>
          )}
        </div>
        <div style={{padding:"12px 20px 24px",borderTop:"1px solid #f3f4f6",display:"grid",gridTemplateColumns:"1fr 2fr",gap:10,flexShrink:0}}>
          <button onClick={onClose} style={{padding:14,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>{t.cancel}</button>
          <button onClick={()=>{if(!ok)return;onSave({id:existing?.id||uid(),name:name.trim(),phone:phone.trim(),adresse:adresse.trim(),nif:nif.trim(),nis:nis.trim(),rc:rc.trim()});onClose();}}
            style={{padding:14,borderRadius:12,border:"none",fontSize:15,fontWeight:800,cursor:ok?"pointer":"default",background:ok?"#2563EB":"#e5e7eb",color:ok?"#fff":"#9ca3af"}}>{t.save}</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   LINE ROW
═══════════════════════════════════════════════ */
function LineRow({line,products,onSetProduct,onUpdate,onRemove,canRemove,lang,t,customUnites}){
  const [showDrop,setShowDrop]=useState(false);
  const [showUniteDrop,setShowUniteDrop]=useState(false);
  const [search,setSearch]=useState("");
  const filtered=products.filter(p=>p.name.toLowerCase().includes((search||line.name||"").toLowerCase())).slice(0,6);
  const iS={fontSize:14,padding:"8px 10px",border:"1.5px solid #e5e7eb",borderRadius:9,outline:"none",background:"#fff",boxSizing:"border-box"};

  const defaultUnites=["unité","pièce","kg","g","litre","ml","m","m²","m³","carton","sac","boîte","palette","heure","jour","forfait"];
  const allUnites=[...new Set([...defaultUnites,...(customUnites||[])])];

  return(
    <div style={{marginBottom:8}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 52px 80px auto",gap:6,alignItems:"center"}}>
        <div style={{position:"relative"}}>
          <input value={line.name||(search)} onChange={e=>{setSearch(e.target.value);onUpdate("name",e.target.value);setShowDrop(true);}}
            onFocus={()=>setShowDrop(true)} onBlur={()=>setShowDrop(false)}
            placeholder="Produit..." style={{...iS,width:"100%",fontWeight:line.name?600:400}}/>
          {showDrop&&filtered.length>0&&(
            <div style={{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:10,zIndex:60,boxShadow:"0 8px 24px rgba(0,0,0,.14)",marginTop:3,overflow:"hidden",maxHeight:180,overflowY:"auto"}}>
              {filtered.map(p=>(
                <div key={p.id}
                  onMouseDown={e=>{e.preventDefault();onSetProduct(p);setSearch("");setShowDrop(false);}}
                  style={{padding:"9px 12px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #f9fafb"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                  <span style={{fontSize:13,fontWeight:600,color:"#111"}}>{p.name}</span>
                  <span style={{fontSize:12,color:"#2563EB",fontWeight:700}}>{fmt(p.price,lang)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <input type="text" inputMode="decimal" value={line.qty} onChange={e=>onUpdate("qty",e.target.value.replace(/[^0-9.]/g,""))} style={{...iS,width:"100%",textAlign:"center"}}/>
        <input type="text" inputMode="decimal" value={line.price} onChange={e=>onUpdate("price",e.target.value.replace(/[^0-9.]/g,""))} style={{...iS,width:"100%",textAlign:"right"}}/>
        {canRemove&&<button onClick={onRemove} style={{background:"none",border:"none",color:"#fca5a5",fontSize:18,cursor:"pointer",padding:0,lineHeight:1}}>×</button>}
      </div>

      {/* Unité selector */}
      <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4,paddingRight:canRemove?28:4}}>
        <div style={{position:"relative"}}>
          <button onClick={()=>setShowUniteDrop(!showUniteDrop)}
            style={{padding:"4px 10px",borderRadius:8,border:"1.5px solid #e5e7eb",background:"#f9fafb",fontSize:11,fontWeight:600,color:"#374151",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
            📦 {line.unite||"unité"} ▾
          </button>
          {showUniteDrop&&(
            <div style={{position:"absolute",top:"100%",left:0,background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:10,zIndex:60,boxShadow:"0 8px 24px rgba(0,0,0,.14)",marginTop:3,padding:8,display:"flex",flexWrap:"wrap",gap:4,width:240}}>
              {allUnites.map(u=>(
                <button key={u} onMouseDown={e=>{e.preventDefault();onUpdate("unite",u);setShowUniteDrop(false);}}
                  style={{padding:"4px 10px",borderRadius:6,border:`1.5px solid ${(line.unite||"unité")===u?"#2563EB":"#e5e7eb"}`,
                    background:(line.unite||"unité")===u?"#eff6ff":"#fff",
                    fontSize:11,fontWeight:600,color:(line.unite||"unité")===u?"#1d4ed8":"#374151",cursor:"pointer"}}>
                  {u}
                </button>
              ))}
            </div>
          )}
        </div>
        {line.name&&line.price&&<div style={{fontSize:11,color:"#9ca3af",marginLeft:"auto"}}>= {fmt((parseFloat(line.price)||0)*(parseFloat(line.qty)||0),lang)}</div>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   INVOICE MODAL
═══════════════════════════════════════════════ */
function InvoiceModal({products,customers,invoices,onClose,onCreated,lang,companyName,preselectedCustomer,bizSettings,duplicate}){
  const t=T[lang],rtl=lang==="ar";
  const [customer,setCustomer]=useState(duplicate?.customer||preselectedCustomer||"");
  const [custInput,setCustInput]=useState(duplicate?.customer||preselectedCustomer||"");
  const [showCustDrop,setShowCustDrop]=useState(false);
  const [showNewCust,setShowNewCust]=useState(false);
  const [lines,setLines]=useState(duplicate?.lines?.map(l=>({...l,id:uid()}))||[{id:uid(),productId:null,name:"",price:"",qty:1,unite:"unité",remise:0}]);
  const [payStatus,setPayStatus]=useState("paid");
  const [paidAmt,setPaidAmt]=useState("");
  const [modePaiement,setModePaiement]=useState(duplicate?.modePaiement||"espèces");
  const [echeance,setEcheance]=useState("");
  const [notes,setNotes]=useState(duplicate?.notes||"");
  const [showMore,setShowMore]=useState(false);

  const allCustNames=[...new Set([...customers.map(c=>c.name),...invoices.map(i=>i.customer).filter(Boolean)])];
  const filtered=allCustNames.filter(c=>c.toLowerCase().includes(custInput.toLowerCase())).slice(0,6);
  const custObj=customers.find(c=>c.name===customer);

  const custInvs=invoices.filter(i=>i.customer===customer);
  const usedProdIds=[...new Set(custInvs.flatMap(i=>i.lines.map(l=>l.productId)).filter(Boolean))];
  const suggested=usedProdIds.map(id=>products.find(p=>p.id===id)).filter(Boolean).slice(0,4);

  const lineTotal=l=>(parseFloat(l.price)||0)*(parseFloat(l.qty)||0)*(1-(parseFloat(l.remise)||0)/100);
  const total=lines.reduce((s,l)=>s+lineTotal(l),0);
  const owingAmt=payStatus==="unpaid"?total:payStatus==="partial"?total-(parseFloat(paidAmt)||0):0;

  const addLine=()=>setLines(p=>[...p,{id:uid(),productId:null,name:"",price:"",qty:1,unite:"unité",remise:0}]);
  const setLP=(lid,prod)=>setLines(p=>p.map(l=>l.id===lid?{...l,productId:prod.id,name:prod.name,price:prod.price}:l));
  const updL=(lid,f,v)=>setLines(p=>p.map(l=>l.id===lid?{...l,[f]:v}:l));
  const canCreate=customer.trim()&&lines.some(l=>l.name.trim()&&parseFloat(l.price)>0);

  const create=()=>{
    if(!canCreate)return;
    const year=new Date().getFullYear();
    const prefix=bizSettings?.invPrefix||"FAC";
    const counter=String(bizSettings?.invCounter||1).padStart(4,"0");
    const invId=`${prefix}-${year}-${counter}`;
    const paidAmount=payStatus==="paid"?total:payStatus==="partial"?parseFloat(paidAmt)||0:0;
    const invoice={
      id:invId, customer:customer.trim(),
      lines:lines.filter(l=>l.name.trim()),
      total, payStatus, paidAmount, date:today(), companyName,
      modePaiement, echeance, notes,
      customerInfo: custObj?{nif:custObj.nif,nis:custObj.nis,rc:custObj.rc,adresse:custObj.adresse,phone:custObj.phone}:null,
    };
    const txs=[];
    if(paidAmount>0) txs.push({id:uid(),type:"income",amount:paidAmount,desc:`Facture ${invId}`,client:customer.trim(),date:today(),paid:true,invoiceId:invId});
    if(owingAmt>0) txs.push({id:uid(),type:"income",amount:owingAmt,desc:`Facture ${invId} (reste)`,client:customer.trim(),date:today(),paid:false,invoiceId:invId});
    onCreated(invoice,txs);
  };

  const stepDot=()=>(
    <div style={{display:"flex",gap:4}}>
      {[!!customer,lines.some(l=>l.name),payStatus!==null].map((done,i)=>(
        <div key={i} style={{width:done?20:8,height:8,borderRadius:4,background:done?"#2563EB":"#e5e7eb",transition:"all .2s"}}/>
      ))}
    </div>
  );

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200,backdropFilter:"blur(6px)"}}>
      <div onClick={e=>e.stopPropagation()} dir={rtl?"rtl":"ltr"}
        style={{background:"#fff",borderRadius:"22px 22px 0 0",width:"100%",maxWidth:480,maxHeight:"92svh",display:"flex",flexDirection:"column",animation:"up .25s cubic-bezier(.22,1,.36,1)"}}>
        <div style={{padding:"18px 20px 14px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div><div style={{fontWeight:900,fontSize:17,color:"#111"}}>{t.newInvoice}</div><div style={{fontSize:12,color:"#9ca3af",marginTop:2}}>{customer||t.selectCustomer}</div></div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>{stepDot()}<button onClick={onClose} style={{background:"#f3f4f6",border:"none",width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:18,color:"#6b7280",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button></div>
        </div>
        <div style={{overflowY:"auto",flex:1,padding:"16px 20px"}}>
          {/* Customer */}
          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>{t.customer}</div>
            <div style={{position:"relative"}}>
              <input autoFocus value={custInput} onChange={e=>{setCustInput(e.target.value);setCustomer(e.target.value);setShowCustDrop(true);}}
                onFocus={()=>setShowCustDrop(true)} onBlur={()=>setShowCustDrop(false)}
                placeholder={t.selectCustomer} style={S.inp({fontWeight:customer?700:400,color:customer?"#111":"#9ca3af"})}/>
              {showCustDrop&&(
                <div style={{position:"absolute",top:"100%",left:0,right:0,background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:10,zIndex:50,boxShadow:"0 8px 24px rgba(0,0,0,.12)",marginTop:4,overflow:"hidden"}}>
                  {filtered.map(c=>(
                    <div key={c}
                      onMouseDown={e=>{e.preventDefault();setCustomer(c);setCustInput(c);setShowCustDrop(false);}}
                      style={{padding:"10px 14px",cursor:"pointer",fontSize:14,fontWeight:500,color:"#111",borderBottom:"1px solid #f9fafb",display:"flex",alignItems:"center",gap:10}}
                      onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                      <Avatar name={c} size={28}/> {c}
                    </div>
                  ))}
                  <div onMouseDown={e=>{e.preventDefault();setShowCustDrop(false);setShowNewCust(true);}}
                    style={{padding:"10px 14px",cursor:"pointer",fontSize:13,fontWeight:700,color:"#2563EB",borderTop:"1px solid #f3f4f6",background:"#f9fafb"}}>
                    + {t.newCustomer.replace("+ ","")}
                  </div>
                </div>
              )}
            </div>
            {customer&&suggested.length>0&&(
              <div style={{marginTop:8,display:"flex",gap:6,flexWrap:"wrap"}}>
                <span style={{fontSize:11,color:"#9ca3af",alignSelf:"center"}}>{t.suggestedProducts}:</span>
                {suggested.map(p=>(
                  <button key={p.id} onClick={()=>{
                    const ex=lines.find(l=>l.productId===p.id);
                    if(ex) updL(ex.id,"qty",(parseInt(ex.qty)||1)+1);
                    else if(lines.length===1&&!lines[0].name) setLP(lines[0].id,p);
                    else setLines(prev=>[...prev,{id:uid(),productId:p.id,name:p.name,price:p.price,qty:1}]);
                  }} style={{padding:"4px 10px",background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:20,fontSize:12,fontWeight:600,color:"#1d4ed8",cursor:"pointer"}}>
                    {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Lines */}
          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>{t.products}</div>
            {lines.map((line,idx)=>(
              <LineRow key={line.id} line={line} products={products} onSetProduct={p=>setLP(line.id,p)}
                onUpdate={(f,v)=>updL(line.id,f,v)} onRemove={()=>setLines(p=>p.filter(l=>l.id!==line.id))}
                customUnites={bizSettings?.customUnites||[]}
                canRemove={lines.length>1} lang={lang} t={t} autoFocus={idx===lines.length-1&&idx>0}/>
            ))}
            <button onClick={addLine} style={{width:"100%",padding:10,background:"#f9fafb",border:"1.5px dashed #e5e7eb",borderRadius:10,fontSize:14,fontWeight:600,color:"#6b7280",cursor:"pointer",marginTop:4}}>{t.addProduct}</button>
          </div>
          {total>0&&<div style={{background:"#f9fafb",borderRadius:12,padding:"12px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:13,color:"#6b7280",fontWeight:600}}>{t.subtotal}</span><span style={{fontSize:20,fontWeight:900,color:"#111"}}>{fmt(total,lang)}</span></div>}
          {/* Payment */}
          <div>
            <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>{t.payStatus}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
              {[["paid","#ecfdf5","#10B981","#065f46"],["partial","#fffbeb","#f59e0b","#92400e"],["unpaid","#fef2f2","#ef4444","#b91c1c"]].map(([s,bg,border,tc])=>(
                <button key={s} onClick={()=>setPayStatus(s)} style={{padding:"10px 4px",borderRadius:10,border:`1.5px solid ${payStatus===s?border:"#e5e7eb"}`,background:payStatus===s?bg:"#fff",fontSize:12,fontWeight:700,color:payStatus===s?tc:"#9ca3af",cursor:"pointer"}}>{t[s]}</button>
              ))}
            </div>
            {payStatus==="partial"&&<div style={{marginTop:10}}><input type="text" inputMode="decimal" placeholder={t.paidAmount} value={paidAmt} onChange={e=>setPaidAmt(e.target.value.replace(/[^0-9.]/g,""))} style={S.inp({fontSize:16,fontWeight:700})}/>{paidAmt&&total>0&&<div style={{fontSize:12,color:"#9ca3af",marginTop:4}}>Reste: {fmt(total-(parseFloat(paidAmt)||0),lang)}</div>}</div>}
          </div>

          {/* Mode de paiement + Échéance */}
          <div style={{marginTop:16}}>
            <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Mode de paiement</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
              {["espèces","chèque","virement","CCP","carte"].map(m=>(
                <button key={m} onClick={()=>setModePaiement(m)}
                  style={{padding:"7px 14px",borderRadius:20,border:`1.5px solid ${modePaiement===m?"#2563EB":"#e5e7eb"}`,
                    background:modePaiement===m?"#eff6ff":"#fff",color:modePaiement===m?"#1d4ed8":"#6b7280",
                    fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  {m}
                </button>
              ))}
            </div>

            {payStatus==="unpaid"&&(
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>Date d'échéance (optionnel)</div>
                <input type="date" value={echeance} onChange={e=>setEcheance(e.target.value)}
                  style={S.inp({fontSize:14})}/>
              </div>
            )}

            {/* ملاحظات */}
            <div style={{marginTop:16}}>
              <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8,marginBottom:8}}>📝 Remarques (optionnel)</div>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)}
                placeholder="Notes, conditions, remarques particulières..."
                rows={2}
                style={{...S.inp({fontSize:13}),resize:"vertical",minHeight:60}}/>
            </div>
          </div>
        </div>
        <div style={{padding:"12px 20px 24px",borderTop:"1px solid #f3f4f6",flexShrink:0}}>
          <button onClick={create} disabled={!canCreate} style={{width:"100%",padding:15,background:canCreate?"#2563EB":"#e5e7eb",color:canCreate?"#fff":"#9ca3af",border:"none",borderRadius:14,fontSize:16,fontWeight:800,cursor:canCreate?"pointer":"default",boxShadow:canCreate?"0 8px 20px rgba(37,99,235,.35)":"none"}}>
            {t.createInvoice}{total>0?` · ${fmt(total,lang)}`:""}
          </button>
        </div>
      </div>
      {showNewCust&&<CustomerModal onSave={c=>{setCustomer(c.name);setCustInput(c.name);onCreated&&false;}}  onClose={()=>setShowNewCust(false)} lang={lang}/>}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PRODUCTS MODAL
═══════════════════════════════════════════════ */
function ProductsModal({products,onSave,onDelete,onClose,lang}){
  const t=T[lang],rtl=lang==="ar";
  const [name,setName]=useState(""), [price,setPrice]=useState(""), [stock,setStock]=useState("0"), [alertThreshold,setAlertThreshold]=useState("5"), [editing,setEditing]=useState(null);
  const [filter,setFilter]=useState("all");
  const [confirmDel,setConfirmDel]=useState(null); // المنتج المراد حذفه
  const ok=name.trim()&&parseFloat(price)>0;
  const submit=()=>{
    if(!ok)return;
    const stockVal=stock?parseInt(stock):0;
    const alertVal=alertThreshold?parseInt(alertThreshold):5;
    onSave({id:editing||uid(),name:name.trim(),price:parseFloat(price),stock:stockVal,alertThreshold:alertVal});
    setName("");setPrice("");setStock("");setAlertThreshold("5");setEditing(null);
  };
  const startEdit=p=>{setEditing(p.id);setName(p.name);setPrice(String(p.price));setStock(p.stock!=null?String(p.stock):"0");setAlertThreshold(p.alertThreshold!=null?String(p.alertThreshold):"5");};

  const withStock=products.filter(p=>p.stock!=null);
  const outOfStock=withStock.filter(p=>p.stock===0);
  const lowStock=withStock.filter(p=>p.stock>0&&p.stock<=(p.alertThreshold??5));

  const filtered=products.filter(p=>{
    if(filter==="out") return p.stock===0;
    if(filter==="low") return p.stock!=null&&p.stock>0&&p.stock<=(p.alertThreshold??5);
    return true;
  });

  const stockColor=p=>{
    if(p.stock==null) return null;
    const threshold=p.alertThreshold??5;
    if(p.stock===0) return {bg:"#fef2f2",c:"#dc2626",label:"Épuisé"};
    if(p.stock<=threshold) return {bg:"#fffbeb",c:"#d97706",label:`${p.stock} restant${p.stock>1?"s":""}`};
    return {bg:"#ecfdf5",c:"#059669",label:`${p.stock} en stock`};
  };

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200,backdropFilter:"blur(6px)"}}>
      <div onClick={e=>e.stopPropagation()} dir={rtl?"rtl":"ltr"} style={{background:"#fff",borderRadius:"22px 22px 0 0",width:"100%",maxWidth:480,maxHeight:"92svh",display:"flex",flexDirection:"column",animation:"up .22s cubic-bezier(.22,1,.36,1)"}}>

        <div style={{padding:"18px 20px 14px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{fontWeight:900,fontSize:17,color:"#111"}}>📦 {t.manageProducts}</div>
          <button onClick={onClose} style={{background:"#f3f4f6",border:"none",width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:18,color:"#6b7280",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
        </div>

        <div style={{overflowY:"auto",flex:1,padding:"16px 20px"}}>

          {/* alertes stock */}
          {(outOfStock.length>0||lowStock.length>0)&&(
            <div style={{marginBottom:14,display:"flex",flexDirection:"column",gap:6}}>
              {outOfStock.length>0&&(
                <div style={{background:"#fef2f2",borderRadius:10,padding:"10px 14px",border:"1px solid #fecaca",display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:16}}>🚨</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:"#b91c1c"}}>Rupture de stock ({outOfStock.length})</div>
                    <div style={{fontSize:11,color:"#dc2626"}}>{outOfStock.map(p=>p.name).join(", ")}</div>
                  </div>
                </div>
              )}
              {lowStock.length>0&&(
                <div style={{background:"#fffbeb",borderRadius:10,padding:"10px 14px",border:"1px solid #fde68a",display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:16}}>⚠️</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:"#92400e"}}>Stock faible ({lowStock.length})</div>
                    <div style={{fontSize:11,color:"#d97706"}}>{lowStock.map(p=>`${p.name} (${p.stock})`).join(", ")}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* formulaire ajout/modif */}
          <div style={{background:"#f9fafb",borderRadius:14,padding:14,marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.6,marginBottom:10}}>
              {editing?"Modifier le produit":"Nouveau produit"}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:8,marginBottom:8}}>
              <input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder={t.productName} style={S.inp()}/>
              <input type="text" inputMode="decimal" value={price} onChange={e=>setPrice(e.target.value.replace(/[^0-9.]/g,""))} placeholder="Prix (DA)" style={S.inp()}/>
            </div>
            {/* Stock */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"#374151",marginBottom:5}}>📦 Stock actuel</div>
                <div style={{display:"flex",alignItems:"center",gap:4}}>
                  <input type="number" min="0" value={stock} onChange={e=>setStock(e.target.value)}
                    style={S.inp({fontSize:15,fontWeight:700})}/>
                  <div style={{display:"flex",gap:2,flexShrink:0}}>
                    {[1,5].map(n=>(
                      <button key={n} onClick={()=>setStock(String(Math.max(0,(parseInt(stock)||0)+n)))}
                        style={{padding:"5px 8px",borderRadius:8,border:"1px solid #bfdbfe",background:"#eff6ff",color:"#1d4ed8",fontSize:11,fontWeight:700,cursor:"pointer"}}>+{n}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"#374151",marginBottom:5}}>⚠️ Alerte si stock ≤</div>
                <div style={{display:"flex",gap:4}}>
                  <input type="number" min="1" value={alertThreshold} onChange={e=>setAlertThreshold(e.target.value)}
                    style={S.inp({fontSize:15,fontWeight:700,borderColor:"#fde68a"})}/>
                  <div style={{display:"flex",gap:2,flexShrink:0}}>
                    {[3,5,10].map(n=>(
                      <button key={n} onClick={()=>setAlertThreshold(String(n))}
                        style={{padding:"5px 7px",borderRadius:8,border:`1px solid ${alertThreshold==n?"#f59e0b":"#e5e7eb"}`,background:alertThreshold==n?"#fffbeb":"#f9fafb",color:alertThreshold==n?"#d97706":"#6b7280",fontSize:11,fontWeight:700,cursor:"pointer"}}>{n}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              {editing&&<button onClick={()=>{setEditing(null);setName("");setPrice("");setStock("");}} style={{flex:1,padding:10,background:"#fff",border:"1.5px solid #e5e7eb",borderRadius:10,fontSize:13,fontWeight:600,color:"#6b7280",cursor:"pointer"}}>{t.cancel}</button>}
              <button onClick={submit} disabled={!ok} style={{flex:2,padding:10,background:ok?"#2563EB":"#e5e7eb",border:"none",borderRadius:10,fontSize:14,fontWeight:700,color:ok?"#fff":"#9ca3af",cursor:ok?"pointer":"default"}}>
                {editing?"✓ Enregistrer":t.addNewProduct}
              </button>
            </div>
          </div>

          {/* filtres */}
          {products.length>0&&(
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {[["all","Tous"],["low","⚠ Stock faible"],["out","🚨 Épuisé"]].map(([k,l])=>(
                <button key={k} onClick={()=>setFilter(k)}
                  style={{padding:"5px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,
                    background:filter===k?"#2563EB":"#f3f4f6",color:filter===k?"#fff":"#6b7280"}}>
                  {l}
                </button>
              ))}
            </div>
          )}

          {/* liste produits */}
          {filtered.length===0?(
            <div style={{textAlign:"center",padding:"24px 0",color:"#9ca3af"}}>{t.noProducts}</div>
          ):filtered.map(p=>{
            const sc=stockColor(p);
            return(
              <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"12px",borderRadius:12,marginBottom:6,
                background:sc&&p.stock===0?"#fef2f2":sc&&p.stock<=5?"#fffbeb":"#f9fafb",
                border:`1px solid ${sc&&p.stock===0?"#fecaca":sc&&p.stock<=5?"#fde68a":"#e5e7eb"}`}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14,color:"#111"}}>{p.name}</div>
                  <div style={{fontSize:12,color:"#6b7280",marginTop:2}}>{fmt(p.price,lang)}</div>
                </div>
                {/* badge stock */}
                {sc&&(
                  <div style={{background:sc.bg,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,color:sc.c,flexShrink:0}}>
                    {sc.label}
                  </div>
                )}
                {/* boutons ajustement stock */}
                {p.stock!=null&&(
                  <div style={{display:"flex",gap:3,flexShrink:0}}>
                    <button onClick={()=>onSave({...p,stock:Math.max(0,(p.stock||0)-1)})}
                      style={{width:24,height:24,borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",cursor:"pointer",fontSize:14,fontWeight:700,color:"#374151",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <button onClick={()=>onSave({...p,stock:(p.stock||0)+1})}
                      style={{width:24,height:24,borderRadius:6,border:"1px solid #e5e7eb",background:"#fff",cursor:"pointer",fontSize:14,fontWeight:700,color:"#374151",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                )}
                <button onClick={()=>startEdit(p)} style={{background:"#f0f9ff",border:"none",padding:"6px 10px",borderRadius:8,fontSize:12,fontWeight:600,color:"#0284c7",cursor:"pointer"}}>✏</button>
                <button onClick={()=>setConfirmDel(p)} style={{background:"#fef2f2",border:"none",padding:"6px 10px",borderRadius:8,fontSize:12,fontWeight:600,color:"#dc2626",cursor:"pointer"}}>×</button>
              </div>
            );
          })}

          {/* نافذة تأكيد حذف المنتج */}
          {confirmDel&&(
            <div onClick={()=>setConfirmDel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,backdropFilter:"blur(4px)",padding:20}}>
              <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:320,boxShadow:"0 24px 64px rgba(0,0,0,.25)",animation:"up .2s cubic-bezier(.22,1,.36,1)"}}>
                <div style={{fontSize:40,textAlign:"center",marginBottom:12}}>🗑</div>
                <div style={{fontWeight:900,fontSize:16,color:"#111",marginBottom:8,textAlign:"center"}}>Supprimer ce produit ?</div>
                <div style={{background:"#f9fafb",borderRadius:12,padding:"10px 14px",marginBottom:20,textAlign:"center"}}>
                  <div style={{fontWeight:700,fontSize:15,color:"#111"}}>{confirmDel.name}</div>
                  <div style={{fontSize:13,color:"#6b7280"}}>{fmt(confirmDel.price,lang)}{confirmDel.stock!=null?` · Stock: ${confirmDel.stock}`:""}</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <button onClick={()=>setConfirmDel(null)} style={{padding:13,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>Annuler</button>
                  <button onClick={()=>{onDelete(confirmDel.id);setConfirmDel(null);}} style={{padding:13,borderRadius:12,border:"none",fontSize:14,fontWeight:800,color:"#fff",background:"#ef4444",cursor:"pointer"}}>Supprimer</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   INVOICE PDF MODAL  — avec historique des paiements
═══════════════════════════════════════════════ */
function InvoicePDFModal({invoice, lang, onClose, relatedTxs, onAddPayment, bizSettings, onIncrementBL, onIncrementBC}){
  const t=T[lang], rtl=lang==="ar";
  const [docType,setDocType]=useState("facture"); // facture | bv
  const sc={paid:"#059669",unpaid:"#dc2626",partial:"#d97706"};
  const sb={paid:"#ecfdf5",unpaid:"#fef2f2",partial:"#fffbeb"};
  const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
  const bs=bizSettings||{};

  // حسابات TVA + Timbre
  const montantHT=invoice.total;
  const tvaAmt=bs.tvaEnabled?Math.round(montantHT*bs.tvaRate/100):0;
  const montantTTC=montantHT+tvaAmt;
  const timbreAmt=bs.timbreEnabled?calcTimbre(montantTTC):0;
  const totalFinal=montantTTC+timbreAmt;

  const paidTxs=(relatedTxs||[]).filter(tx=>tx.paid).sort((a,b)=>new Date(a.date)-new Date(b.date));
  const totalPaid=paidTxs.reduce((s,tx)=>s+tx.amount,0);
  const remaining=Math.max(0, totalFinal - totalPaid);
  const isFullyPaid=remaining===0;

  const [showForm,setShowForm]=useState(false);
  const [newAmt,setNewAmt]=useState("");
  const [newNote,setNewNote]=useState("");
  const [newDate,setNewDate]=useState(today());
  const canAdd=parseFloat(newAmt)>0 && remaining>0;

  const handleAddPayment=()=>{
    if(!canAdd) return;
    const amt=Math.min(parseFloat(newAmt), remaining);
    onAddPayment({
      id:uid(), type:"income", amount:amt,
      desc:newNote.trim()||`Facture ${invoice.id} — dépense ${paidTxs.length+1}`,
      client:invoice.customer, date:newDate, paid:true, invoiceId:invoice.id,
    });
    setNewAmt(""); setNewNote(""); setShowForm(false);
  };

  const buildHTML=(autoPrint=false)=>{
    const rows=invoice.lines.map(l=>{
      const pu=parseFloat(l.price)||0;
      const qty=parseFloat(l.qty)||1;
      const rem=parseFloat(l.remise)||0;
      const montant=pu*qty*(1-rem/100);
      return `<tr>
        <td>${l.name}</td>
        <td style="text-align:center">${qty}</td>
        <td style="text-align:center;font-size:11px;color:#64748b">${l.unite||"unité"}</td>
        <td style="text-align:right">${pu.toLocaleString()} DA</td>
        ${rem>0?`<td style="text-align:center;color:#d97706">-${rem}%</td>`:`<td style="text-align:center;color:#94a3b8">—</td>`}
        <td style="text-align:right;font-weight:600">${montant.toLocaleString()} DA</td>
      </tr>`;
    }).join("");
    const payRows=paidTxs.map((tx,i)=>`
      <tr>
        <td>${i===0?t.firstPayment:t.paymentNum(i+1)}</td>
        <td style="text-align:right;color:#059669;font-weight:700">+${tx.amount.toLocaleString()} DA</td>
        <td style="text-align:right;color:#9ca3af">${tx.date}</td>
      </tr>`).join("");
    const statusLabel=isFullyPaid?t.statusPaid:(t["status"+cap(invoice.payStatus)]||"");
    const ci=invoice.customerInfo||{};
    const lettres=montantEnLettres(totalFinal);
    return `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Facture ${invoice.id}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#fff;color:#1e293b;padding:32px}
  .page{max-width:740px;margin:0 auto}
  .header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:20px;border-bottom:3px solid #1e293b;margin-bottom:20px}
  .logo-block img{height:56px;max-width:150px;object-fit:contain;margin-bottom:8px;display:block}
  .company-name{font-size:18px;font-weight:900;color:#1e293b;margin-bottom:5px}
  .company-info{font-size:10.5px;color:#64748b;line-height:1.9}
  .company-info span{display:block}
  .inv-block{text-align:right}
  .inv-title{font-size:28px;font-weight:900;color:#1e293b;letter-spacing:-1px;margin-bottom:4px}
  .inv-number{font-size:13px;color:#64748b;font-family:monospace;margin-bottom:4px}
  .inv-date{font-size:12px;color:#64748b;margin-bottom:2px}
  .badge{display:inline-block;padding:4px 12px;border-radius:4px;font-size:11px;font-weight:700;margin-top:6px;border:1.5px solid}
  .badge-paid{border-color:#059669;color:#059669}
  .badge-unpaid{border-color:#dc2626;color:#dc2626}
  .badge-partial{border-color:#d97706;color:#d97706}
  .parties{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
  .party-block{padding:12px 14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0}
  .party-label{font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px}
  .party-name{font-size:15px;font-weight:700;color:#1e293b;margin-bottom:4px}
  .party-info{font-size:10.5px;color:#64748b;line-height:1.9;font-family:monospace}
  .party-info span{display:block}
  table{width:100%;border-collapse:collapse;margin-bottom:16px}
  thead tr{border-bottom:2px solid #1e293b}
  th{font-size:9.5px;color:#64748b;text-transform:uppercase;letter-spacing:.8px;padding:8px 8px;text-align:left}
  tbody tr{border-bottom:1px solid #e2e8f0}
  td{padding:9px 8px;font-size:13px;color:#1e293b}
  .tc{text-align:center}
  .tr{text-align:right;font-weight:600}
  .totals{border:1.5px solid #e2e8f0;border-radius:6px;padding:14px 18px;margin-bottom:14px}
  .tl{display:flex;justify-content:space-between;padding:4px 0;font-size:13px;color:#64748b}
  .tl.sep{border-top:1px solid #e2e8f0;margin-top:6px;padding-top:10px}
  .tl.main{font-size:17px;font-weight:900;color:#1e293b;border-top:2px solid #1e293b;margin-top:6px;padding-top:10px}
  .lettres{background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:10px 14px;margin-bottom:14px;font-size:11.5px;color:#374151}
  .pr{display:flex;justify-content:space-between;padding:7px 10px;border:1px solid #e2e8f0;border-radius:4px;margin-bottom:4px;font-size:12px}
  .pr .pamt{font-weight:700;color:#059669}
  .rr{display:flex;justify-content:space-between;padding:9px 12px;border:1.5px solid #1e293b;border-radius:4px;margin-top:6px}
  .rr.clear{border-color:#059669}
  .footer{margin-top:28px;padding-top:14px;border-top:1.5px solid #e2e8f0;display:flex;justify-content:space-between;align-items:flex-end}
  .footer-legal{font-size:9.5px;color:#94a3b8;line-height:1.9;font-family:monospace}
  .footer-brand{font-size:10px;color:#94a3b8;text-align:right}
  @media print{body{padding:20px}}
</style>
${autoPrint?`<script>window.onload=function(){window.print();}<\/script>`:""}
</head><body><div class="page">

<div class="header">
  <div class="logo-block">
    ${bs.logo?`<img src="${bs.logo}" alt="logo"/>`:""}
    <div class="company-name">${invoice.companyName||"Fawtara"}</div>
    <div class="company-info">
      ${bs.activite?`<span>${bs.activite}</span>`:""}
      ${bs.adresse?`<span>${bs.adresse}</span>`:""}
    </div>
  </div>
  <div class="inv-block">
    <div class="inv-title">FACTURE</div>
    <div class="inv-number">N° ${invoice.id}</div>
    <div class="inv-date">Date : ${invoice.date}</div>
    ${invoice.echeance?`<div class="inv-date">Échéance : ${invoice.echeance}</div>`:""}
    <div class="badge ${isFullyPaid?"badge-paid":invoice.payStatus==="unpaid"?"badge-unpaid":"badge-partial"}">${statusLabel}</div>
  </div>
</div>

<div class="parties">
  <div class="party-block">
    <div class="party-label">Vendeur</div>
    <div class="party-name">${invoice.companyName||"Fawtara"}</div>
    <div class="party-info">
      ${bs.nif?`<span>NIF : ${bs.nif}</span>`:""}
      ${bs.nis?`<span>NIS : ${bs.nis}</span>`:""}
      ${bs.rc?`<span>RC : ${bs.rc}</span>`:""}
      ${bs.article?`<span>Art. : ${bs.article}</span>`:""}
      ${bs.adresse?`<span>${bs.adresse}</span>`:""}
    </div>
  </div>
  <div class="party-block">
    <div class="party-label">Acheteur</div>
    <div class="party-name">${invoice.customer}</div>
    <div class="party-info">
      ${ci.nif?`<span>NIF : ${ci.nif}</span>`:""}
      ${ci.nis?`<span>NIS : ${ci.nis}</span>`:""}
      ${ci.rc?`<span>RC : ${ci.rc}</span>`:""}
      ${ci.adresse?`<span>${ci.adresse}</span>`:""}
      ${ci.phone?`<span>Tél : ${ci.phone}</span>`:""}
    </div>
  </div>
</div>

<table>
  <thead><tr>
    <th>Désignation</th>
    <th class="tc">Qté</th>
    <th class="tc">Unité</th>
    <th style="text-align:right">${bs.tvaEnabled?"PU HT":"Prix unit."}</th>
    <th class="tc">Remise</th>
    <th style="text-align:right">${bs.tvaEnabled?"Montant HT":"Total"}</th>
  </tr></thead>
  <tbody>${rows}</tbody>
</table>

<div class="totals">
  <div class="tl"><span>Sous-total HT</span><span>${montantHT.toLocaleString()} DA</span></div>
  ${bs.tvaEnabled?`<div class="tl"><span>TVA ${bs.tvaRate}%</span><span>+ ${tvaAmt.toLocaleString()} DA</span></div>`:""}
  ${bs.tvaEnabled?`<div class="tl sep"><span style="font-weight:600">Total TTC</span><span style="font-weight:700">${montantTTC.toLocaleString()} DA</span></div>`:""}
  ${bs.timbreEnabled?`<div class="tl"><span>Droit de Timbre <small style="color:#94a3b8">(LF 2025 Art.100)</small></span><span>+ ${timbreAmt.toLocaleString()} DA</span></div>`:""}
  <div class="tl main"><span>Total à payer</span><span>${totalFinal.toLocaleString()} DA</span></div>
</div>

<div class="lettres"><strong>Arrêtée la présente facture à la somme de :</strong> ${lettres}</div>

<div style="margin-bottom:14px;font-size:12px;color:#475569">
  <strong>Mode de règlement :</strong> ${invoice.modePaiement||"espèces"}
  ${invoice.echeance?` &nbsp;·&nbsp; <strong>Échéance :</strong> ${invoice.echeance}`:""}
</div>

${invoice.notes?`<div style="margin-bottom:14px;padding:10px 14px;background:#f8fafc;border-left:3px solid #1e293b;border-radius:0 6px 6px 0;font-size:12px;color:#374151"><strong>Remarques :</strong> ${invoice.notes}</div>`:""}

${paidTxs.length>0?`
<div style="margin-bottom:14px">
  <div style="font-size:9.5px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:8px">Historique des paiements</div>
  ${paidTxs.map((tx,i)=>`
  <div class="pr">
    <span>${i===0?t.firstPayment:t.paymentNum(i+1)} — ${tx.date}</span>
    <span class="pamt">+ ${tx.amount.toLocaleString()} DA</span>
  </div>`).join("")}
  <div class="rr ${remaining===0?"clear":""}">
    <span style="font-weight:700;font-size:13px">${remaining>0?t.remaining:t.fullyPaid}</span>
    <span style="font-weight:800;font-size:14px">${remaining>0?remaining.toLocaleString()+" DA":"✓ Soldé"}</span>
  </div>
</div>`:""}

<div class="footer">
  <div class="footer-legal">
    ${[bs.nif?`NIF: ${bs.nif}`:"",bs.nis?`NIS: ${bs.nis}`:"",bs.rc?`RC: ${bs.rc}`:"",bs.article?`Art: ${bs.article}`:""].filter(Boolean).join("  ·  ")}
    ${bs.adresse?`<br>${bs.adresse}`:""}
  </div>
  <div class="footer-brand">Document généré par Fawtara</div>
</div>

</div></body></html>`;
  };

  const openInTab=(autoPrint=false)=>{
    const html=buildHTML(autoPrint);
    const blob=new Blob([html],{type:"text/html"});
    const url=URL.createObjectURL(blob);
    window.open(url,"_blank");
    setTimeout(()=>URL.revokeObjectURL(url),10000);
  };

  const printPDF=()=>openInTab(false);
  const printDirect=()=>openInTab(true);

  const printBL=()=>{
    const year=new Date().getFullYear();
    const blNum=String(bs?.blCounter||1).padStart(4,"0");
    const blId=`BL-${year}-${blNum}`;
    // increment counter
    if(onIncrementBL) onIncrementBL();    const blRows=invoice.lines.map(l=>`
      <tr>
        <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-size:13px">${l.name}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:center">${l.qty||1}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:center">${l.unite||"unité"}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:center">□</td>
      </tr>`).join("");
    const html=`<!DOCTYPE html><html><head><meta charset="utf-8">
<title>BL ${invoice.id}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#fff;color:#1e293b;padding:32px}
  .page{max-width:700px;margin:0 auto}
  .header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;border-bottom:3px solid #1e293b;margin-bottom:20px}
  .badge{background:#1e293b;color:#fff;padding:6px 16px;border-radius:6px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase}
  .parties{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
  .party{padding:12px 14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0}
  .party-label{font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:5px}
  .party-name{font-size:15px;font-weight:700;color:#1e293b}
  table{width:100%;border-collapse:collapse;margin-bottom:24px}
  thead tr{border-bottom:2px solid #1e293b;background:#f8fafc}
  th{padding:10px 8px;font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.8px;text-align:left}
  th:not(:first-child){text-align:center}
  .sign-section{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:32px}
  .sign-box{border:1.5px solid #e2e8f0;border-radius:8px;padding:16px;min-height:100px}
  .sign-label{font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
  .sign-line{border-bottom:1px dashed #cbd5e1;margin-top:60px}
  .footer{margin-top:28px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:10px;color:#94a3b8;display:flex;justify-content:space-between;font-family:monospace}
  @media print{body{padding:20px}}
</style>
<script>window.onload=function(){window.print();}<\/script>
</head><body><div class="page">

<div class="header">
  <div>
    ${bs?.logo?`<img src="${bs.logo}" style="height:48px;max-width:130px;object-fit:contain;margin-bottom:8px;display:block"/>`:""}
    <div style="font-size:18px;font-weight:900;color:#1e293b;margin-bottom:4px">${invoice.companyName||"Fawtara"}</div>
    <div style="font-size:10px;color:#64748b">
      ${bs?.adresse||""}${bs?.nif?` · NIF: ${bs.nif}`:""}
    </div>
  </div>
  <div style="text-align:right">
    <div class="badge">Bon de Livraison</div>
    <div style="font-size:18px;font-weight:900;color:#1e293b;margin-top:10px;font-family:monospace">N° ${blId}</div>
    <div style="font-size:12px;color:#64748b;margin-top:4px">Date : ${invoice.date}</div>
  </div>
</div>

<div class="parties">
  <div class="party">
    <div class="party-label">Expéditeur</div>
    <div class="party-name">${invoice.companyName||"Fawtara"}</div>
    ${bs?.adresse?`<div style="font-size:11px;color:#64748b;margin-top:3px">${bs.adresse}</div>`:""}
  </div>
  <div class="party">
    <div class="party-label">Destinataire</div>
    <div class="party-name">${invoice.customer}</div>
    ${invoice.customerInfo?.adresse?`<div style="font-size:11px;color:#64748b;margin-top:3px">${invoice.customerInfo.adresse}</div>`:""}
  </div>
</div>

<table>
  <thead><tr>
    <th>Désignation</th>
    <th>Quantité</th>
    <th>Unité</th>
    <th>Conforme ✓</th>
  </tr></thead>
  <tbody>${blRows}</tbody>
</table>

<div class="sign-section">
  <div class="sign-box">
    <div class="sign-label">Expéditeur — Signature & Cachet</div>
    <div class="sign-line"></div>
  </div>
  <div class="sign-box">
    <div class="sign-label">Récepteur — Signature & Cachet</div>
    <div class="sign-line"></div>
  </div>
</div>

<div class="footer">
  <span>${invoice.companyName||"Fawtara"}${bs?.nif?` · NIF: ${bs.nif}`:""}${bs?.rc?` · RC: ${bs.rc}`:""}</span>
  <span>Document généré par Fawtara</span>
</div>

</div></body></html>`;
    const blob=new Blob([html],{type:"text/html"});
    const url=URL.createObjectURL(blob);
    window.open(url,"_blank");
    setTimeout(()=>URL.revokeObjectURL(url),10000);
  };

  const printBC=()=>{
    const year=new Date().getFullYear();
    const bcNum=String(bs?.bcCounter||1).padStart(4,"0");
    const bcId=`BC-${year}-${bcNum}`;
    if(onIncrementBC) onIncrementBC();
    const bcRows=invoice.lines.map(l=>`
      <tr>
        <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-size:13px">${l.name}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:center">${l.qty||1}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:center">${l.unite||"unité"}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:right;font-weight:600">${(parseFloat(l.price)||0).toLocaleString()} DA</td>
        <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:right;font-weight:700">${((parseFloat(l.price)||0)*(parseFloat(l.qty)||1)).toLocaleString()} DA</td>
      </tr>`).join("");
    const html=`<!DOCTYPE html><html><head><meta charset="utf-8">
<title>BC ${invoice.id}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#fff;color:#1e293b;padding:32px}
  .page{max-width:700px;margin:0 auto}
  .header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;border-bottom:3px solid #1e293b;margin-bottom:20px}
  .badge{background:#2563EB;color:#fff;padding:6px 16px;border-radius:6px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase}
  .parties{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
  .party{padding:12px 14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0}
  .party-label{font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:5px}
  .party-name{font-size:15px;font-weight:700;color:#1e293b}
  table{width:100%;border-collapse:collapse;margin-bottom:20px}
  thead tr{border-bottom:2px solid #1e293b;background:#f8fafc}
  th{padding:10px 8px;font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.8px;text-align:left}
  th:not(:first-child){text-align:right}
  th:nth-child(2),th:nth-child(3){text-align:center}
  .total-box{background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:8px;padding:14px 18px;margin-bottom:20px}
  .total-line{display:flex;justify-content:space-between;padding:4px 0;font-size:13px;color:#64748b}
  .total-main{font-size:17px;font-weight:900;color:#1e293b;border-top:2px solid #1e293b;margin-top:8px;padding-top:10px;display:flex;justify-content:space-between}
  .conditions{background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 14px;margin-bottom:20px;font-size:12px;color:#92400e}
  .sign-section{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px}
  .sign-box{border:1.5px solid #e2e8f0;border-radius:8px;padding:16px;min-height:90px}
  .sign-label{font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
  .sign-line{border-bottom:1px dashed #cbd5e1;margin-top:55px}
  .footer{margin-top:28px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:10px;color:#94a3b8;display:flex;justify-content:space-between;font-family:monospace}
  @media print{body{padding:20px}}
</style>
<script>window.onload=function(){window.print();}<\/script>
</head><body><div class="page">

<div class="header">
  <div>
    ${bs?.logo?`<img src="${bs.logo}" style="height:48px;max-width:130px;object-fit:contain;margin-bottom:8px;display:block"/>`:""}
    <div style="font-size:18px;font-weight:900;color:#1e293b;margin-bottom:4px">${invoice.companyName||"Fawtara"}</div>
    <div style="font-size:10px;color:#64748b;font-family:monospace">
      ${bs?.nif?`NIF: ${bs.nif}`:""} ${bs?.rc?`· RC: ${bs.rc}`:""}
    </div>
  </div>
  <div style="text-align:right">
    <div class="badge">Bon de Commande</div>
    <div style="font-size:18px;font-weight:900;color:#1e293b;margin-top:10px;font-family:monospace">N° ${bcId}</div>
    <div style="font-size:12px;color:#64748b;margin-top:4px">Date : ${invoice.date}</div>
    ${invoice.echeance?`<div style="font-size:12px;color:#d97706;margin-top:2px;font-weight:600">Livraison prévue : ${invoice.echeance}</div>`:""}
  </div>
</div>

<div class="parties">
  <div class="party">
    <div class="party-label">Fournisseur</div>
    <div class="party-name">${invoice.companyName||"Fawtara"}</div>
    ${bs?.adresse?`<div style="font-size:11px;color:#64748b;margin-top:3px">${bs.adresse}</div>`:""}
    ${bs?.nif?`<div style="font-size:10px;color:#94a3b8;font-family:monospace;margin-top:2px">NIF: ${bs.nif}</div>`:""}
  </div>
  <div class="party">
    <div class="party-label">Acheteur</div>
    <div class="party-name">${invoice.customer}</div>
    ${invoice.customerInfo?.adresse?`<div style="font-size:11px;color:#64748b;margin-top:3px">${invoice.customerInfo.adresse}</div>`:""}
    ${invoice.customerInfo?.nif?`<div style="font-size:10px;color:#94a3b8;font-family:monospace;margin-top:2px">NIF: ${invoice.customerInfo.nif}</div>`:""}
  </div>
</div>

<table>
  <thead><tr>
    <th>Désignation</th>
    <th style="text-align:center">Qté</th>
    <th style="text-align:center">Unité</th>
    <th style="text-align:right">Prix unit. HT</th>
    <th style="text-align:right">Montant HT</th>
  </tr></thead>
  <tbody>${bcRows}</tbody>
</table>

<div class="total-box">
  <div class="total-line"><span>Sous-total HT</span><span>${invoice.total.toLocaleString()} DA</span></div>
  ${bs?.tvaEnabled?`<div class="total-line"><span>TVA ${bs.tvaRate}%</span><span>+ ${Math.round(invoice.total*bs.tvaRate/100).toLocaleString()} DA</span></div>`:""}
  <div class="total-main"><span>Total à payer</span><span>${totalFinal.toLocaleString()} DA</span></div>
</div>

<div class="conditions">
  <strong>Mode de règlement :</strong> ${invoice.modePaiement||"espèces"}
  ${invoice.echeance?` &nbsp;·&nbsp; <strong>Échéance :</strong> ${invoice.echeance}`:""}
  ${invoice.notes?`<br><strong>Remarques :</strong> ${invoice.notes}`:""}
</div>

<div class="sign-section">
  <div class="sign-box">
    <div class="sign-label">Acheteur — Signature & Cachet</div>
    <div style="font-size:11px;color:#94a3b8;margin-top:4px">Lu et approuvé</div>
    <div class="sign-line"></div>
  </div>
  <div class="sign-box">
    <div class="sign-label">Vendeur — Signature & Cachet</div>
    <div style="font-size:11px;color:#94a3b8;margin-top:4px">Bon pour accord</div>
    <div class="sign-line"></div>
  </div>
</div>

<div class="footer">
  <span>${invoice.companyName||"Fawtara"}${bs?.nif?` · NIF: ${bs.nif}`:""}${bs?.rc?` · RC: ${bs.rc}`:""}</span>
  <span>Document généré par Fawtara</span>
</div>

</div></body></html>`;
    const blob=new Blob([html],{type:"text/html"});
    const url=URL.createObjectURL(blob);
    window.open(url,"_blank");
    setTimeout(()=>URL.revokeObjectURL(url),10000);
  };

  const printBV=()=>{
    const bvRows=invoice.lines.map(l=>{
      const qty=parseFloat(l.qty)||1;
      const prix=parseFloat(l.price)||0;
      return`<tr>
        <td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #f1f5f9">${l.name}</td>
        <td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #f1f5f9;text-align:center">${qty}</td>
        <td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #f1f5f9;text-align:right">${prix.toLocaleString()} DA</td>
        <td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:700">${(qty*prix).toLocaleString()} DA</td>
      </tr>`;
    }).join("");
    const html=`<!DOCTYPE html><html><head><meta charset="utf-8">
<title>BV ${invoice.id}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif;padding:24px;max-width:380px;margin:0 auto;color:#1e293b}
  .top{text-align:center;padding-bottom:14px;border-bottom:2px solid #1e293b;margin-bottom:14px}
  .company{font-size:20px;font-weight:900}
  .sub{font-size:11px;color:#64748b;margin-top:3px;line-height:1.6}
  .meta{display:flex;justify-content:space-between;font-size:11px;color:#64748b;margin-bottom:12px}
  table{width:100%;border-collapse:collapse;margin-bottom:12px}
  th{font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.8px;padding:6px 8px;border-bottom:2px solid #1e293b;text-align:left}
  th:not(:first-child){text-align:right} th:nth-child(2){text-align:center}
  .total-section{border-top:2px solid #1e293b;padding-top:10px;margin-bottom:16px}
  .trow{display:flex;justify-content:space-between;padding:3px 8px;font-size:13px;color:#64748b}
  .tmain{display:flex;justify-content:space-between;padding:8px;font-size:18px;font-weight:900;border-top:1px solid #e2e8f0;margin-top:4px}
  .footer{text-align:center;font-size:12px;color:#94a3b8;border-top:1px dashed #e2e8f0;padding-top:12px}
  @media print{body{padding:16px;max-width:100%}}
</style>
<script>window.onload=function(){window.print();}<\/script>
</head><body>
<div class="top">
  ${bs?.logo?`<img src="${bs.logo}" style="height:50px;object-fit:contain;margin-bottom:6px;display:block;margin:0 auto 6px"/>`:""  }
  <div class="company">${invoice.companyName||"Fawtara"}</div>
  <div class="sub">${bs?.adresse||""}${bs?.activite?`<br>${bs.activite}`:""}</div>
</div>
<div class="meta">
  <span><strong>Client:</strong> ${invoice.customer}</span>
  <span>${invoice.date}</span>
</div>
<table>
  <thead><tr><th>Article</th><th style="text-align:center">Qté</th><th style="text-align:right">Prix</th><th style="text-align:right">Total</th></tr></thead>
  <tbody>${bvRows}</tbody>
</table>
<div class="total-section">
  ${bs?.tvaEnabled?`<div class="trow"><span>HT</span><span>${invoice.total.toLocaleString()} DA</span></div><div class="trow"><span>TVA ${bs.tvaRate}%</span><span>+${Math.round(invoice.total*(bs.tvaRate||19)/100).toLocaleString()} DA</span></div>`:""}
  ${bs?.timbreEnabled?`<div class="trow"><span>Timbre</span><span>+${timbreAmt.toLocaleString()} DA</span></div>`:""}
  <div class="tmain"><span>Total</span><span>${totalFinal.toLocaleString()} DA</span></div>
</div>
<div class="footer">Merci pour votre confiance 🙏<br><span style="font-size:10px">Non fiscal · ${invoice.id}</span></div>
</body></html>`;
    const blob=new Blob([html],{type:"text/html"});
    const url=URL.createObjectURL(blob);
    window.open(url,"_blank");
    setTimeout(()=>URL.revokeObjectURL(url),10000);
  };

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200,backdropFilter:"blur(6px)"}}>
      <div onClick={e=>e.stopPropagation()} dir={rtl?"rtl":"ltr"}
        style={{background:"#fff",borderRadius:"22px 22px 0 0",width:"100%",maxWidth:480,maxHeight:"92svh",display:"flex",flexDirection:"column",animation:"up .22s cubic-bezier(.22,1,.36,1)"}}>

        {/* Header */}
        <div style={{padding:"18px 20px 14px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div>
            <div style={{fontWeight:900,fontSize:17,color:"#111"}}>
              {docType==="bv"?"🧾 Bon de Vente":"🧾 "+t.invoiceNo} {invoice.id}
            </div>
            <div style={{fontSize:12,color:"#9ca3af",marginTop:2}}>{invoice.customer} · {invoice.date}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>setDocType(docType==="bv"?"facture":"bv")}
              style={{padding:"5px 10px",borderRadius:8,border:"1.5px solid #e5e7eb",fontSize:11,fontWeight:700,cursor:"pointer",
                background:docType==="bv"?"#fef3c7":"#f3f4f6",color:docType==="bv"?"#92400e":"#6b7280"}}>
              {docType==="bv"?"→ Facture":"→ BV"}
            </button>
            <button onClick={onClose} style={{background:"#f3f4f6",border:"none",width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:18,color:"#6b7280",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
        </div>

        <div style={{overflowY:"auto",flex:1,padding:"16px 20px"}}>

          {/* Lignes produits */}
          <div style={{background:"#f9fafb",borderRadius:14,padding:16,marginBottom:16}}>
            <div style={{fontWeight:800,fontSize:15,color:"#2563EB",marginBottom:4}}>{invoice.companyName}</div>
            <div style={{fontSize:12,color:"#9ca3af",marginBottom:12}}>{invoice.customer} · {invoice.date}</div>
            {invoice.lines.map((l,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #e5e7eb",fontSize:13}}>
                <span style={{color:"#374151"}}>{l.name} <span style={{color:"#9ca3af"}}>×{l.qty||1}</span></span>
                <span style={{fontWeight:700,color:"#111"}}>{fmt((parseFloat(l.price)||0)*(parseFloat(l.qty)||1),lang)}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0 0",fontWeight:900,fontSize:17,borderTop:"2px solid #111",marginTop:8}}>
              <span>{t.total}</span>
              <span style={{color:"#2563EB"}}>{fmt(invoice.total,lang)}</span>
            </div>
          </div>

          {/* Section dépenses */}
          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8,marginBottom:10}}>
              💳 {t.payments}
            </div>

            {paidTxs.length===0 && !showForm &&(
              <div style={{fontSize:13,color:"#9ca3af",padding:"10px 0"}}>{t.noPayments}</div>
            )}

            {/* Liste des dépenses */}
            {paidTxs.map((tx,i)=>(
              <div key={tx.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background: i===0?"#f0fdf4":"#f9fafb",borderRadius:12,marginBottom:6,border:`1px solid ${i===0?"#bbf7d0":"#f3f4f6"}`}}>
                <div style={{width:32,height:32,borderRadius:8,background:i===0?"#dcfce7":"#e5e7eb",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>
                  {i===0?"💰":"💵"}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#111"}}>{i===0?t.firstPayment:t.paymentNum(i+1)}</div>
                  <div style={{fontSize:11,color:"#9ca3af"}}>{tx.date}{tx.desc&&!tx.desc.startsWith("Facture")?` · ${tx.desc}`:""}</div>
                </div>
                <span style={{fontWeight:800,fontSize:15,color:"#059669"}}>+{fmt(tx.amount,lang)}</span>
              </div>
            ))}

            {/* Résumé restant */}
            {paidTxs.length>0&&(
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:isFullyPaid?"#ecfdf5":"#fffbeb",borderRadius:12,marginTop:4,border:`1px solid ${isFullyPaid?"#a7f3d0":"#fde68a"}`}}>
                <span style={{fontSize:13,fontWeight:700,color:isFullyPaid?"#065f46":"#92400e"}}>
                  {isFullyPaid?"✓ "+t.fullyPaid:t.remaining}
                </span>
                {!isFullyPaid&&<span style={{fontWeight:900,fontSize:16,color:"#d97706"}}>{fmt(remaining,lang)}</span>}
              </div>
            )}

            {/* Formulaire ajout dépense */}
            {showForm&&(
              <div style={{background:"#eff6ff",borderRadius:14,padding:14,marginTop:10,border:"1.5px solid #bfdbfe",animation:"up .18s cubic-bezier(.22,1,.36,1)"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#1d4ed8",marginBottom:10}}>
                  {t.paymentNum(paidTxs.length+1)} {remaining>0?`(max ${fmt(remaining,lang)})`:""} 
                </div>
                <input
                  autoFocus
                  type="number"
                  placeholder={t.paymentAmount}
                  value={newAmt}
                  onChange={e=>setNewAmt(e.target.value)}
                  style={{...S.inp({marginBottom:8,fontSize:18,fontWeight:700,borderColor:"#bfdbfe"})}}
                />
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                  <input
                    type="date"
                    value={newDate}
                    onChange={e=>setNewDate(e.target.value)}
                    style={S.inp({borderColor:"#bfdbfe"})}
                  />
                  <input
                    type="text"
                    placeholder={t.paymentNote}
                    value={newNote}
                    onChange={e=>setNewNote(e.target.value)}
                    style={S.inp({borderColor:"#bfdbfe"})}
                  />
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:8}}>
                  <button onClick={()=>{setShowForm(false);setNewAmt("");setNewNote("");}}
                    style={{padding:"10px",borderRadius:10,border:"1.5px solid #bfdbfe",fontSize:13,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>
                    {t.cancel}
                  </button>
                  <button onClick={handleAddPayment} disabled={!canAdd}
                    style={{padding:"10px",borderRadius:10,border:"none",fontSize:14,fontWeight:800,color:canAdd?"#fff":"#9ca3af",background:canAdd?"#2563EB":"#e5e7eb",cursor:canAdd?"pointer":"default"}}>
                    {t.save} {newAmt?`· ${fmt(Math.min(parseFloat(newAmt)||0,remaining),lang)}`:""}
                  </button>
                </div>
              </div>
            )}

            {/* Bouton + dépense */}
            {!showForm&&!isFullyPaid&&(
              <button onClick={()=>setShowForm(true)}
                style={{width:"100%",padding:"11px",background:"#eff6ff",border:"1.5px dashed #bfdbfe",borderRadius:12,fontSize:14,fontWeight:700,color:"#1d4ed8",cursor:"pointer",marginTop:8}}>
                {t.addPayment}
              </button>
            )}
          </div>
        </div>

        {/* Footer — 4 أزرار */}
        <div style={{padding:"12px 20px 24px",borderTop:"1px solid #f3f4f6",flexShrink:0,display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <button onClick={printDirect}
              style={{padding:13,background:"#f3f4f6",color:"#374151",border:"none",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              🖨 Imprimer
            </button>
            <button onClick={printPDF}
              style={{padding:13,background:"#111",color:"#fff",border:"none",borderRadius:12,fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              ⬇ PDF
            </button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
            <button onClick={printBL}
              style={{padding:11,background:"#0ea5e9",color:"#fff",border:"none",borderRadius:12,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
              🚚 BL
            </button>
            <button onClick={printBC}
              style={{padding:11,background:"#6366f1",color:"#fff",border:"none",borderRadius:12,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
              📋 BC
            </button>
            <button onClick={()=>{setDocType("bv");printBV();}}
              style={{padding:11,background:"#f59e0b",color:"#fff",border:"none",borderRadius:12,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
              🧾 BV
            </button>
            <button onClick={()=>{
              const msg=encodeURIComponent(`Facture N° ${invoice.id}\nClient: ${invoice.customer}\nMontant: ${totalFinal.toLocaleString()} DA\nDate: ${invoice.date}`);
              window.open(`https://wa.me/?text=${msg}`,"_blank");
            }}
              style={{padding:11,background:"#25D366",color:"#fff",border:"none",borderRadius:12,fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
              📲 WA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CUSTOMER DETAIL VIEW
═══════════════════════════════════════════════ */
function CustomerDetail({customer,invoices,txs,products,onBack,onEdit,onDelete,onNewInvoice,onOpenInvoice,lang}){
  const t=T[lang],rtl=lang==="ar";
  const custInvs=invoices.filter(i=>i.customer===customer.name).sort((a,b)=>new Date(b.date)-new Date(a.date));
  const custTxs=txs.filter(x=>x.client===customer.name&&x.type==="income").sort((a,b)=>new Date(b.date)-new Date(a.date));
  const totalSpent=custInvs.reduce((s,i)=>s+i.total,0);
  const totalPaid=custInvs.reduce((s,i)=>s+(i.paidAmount||0),0);
  const debt=totalSpent-totalPaid;
  const boughtMap={};
  custInvs.forEach(inv=>inv.lines.forEach(l=>{if(!boughtMap[l.name])boughtMap[l.name]=0;boughtMap[l.name]+=(parseFloat(l.qty)||1);}));
  const boughtItems=Object.entries(boughtMap).sort((a,b)=>b[1]-a[1]);
  const lastDate=custInvs[0]?.date||"—";
  const invoiceCount=custInvs.length;

  const [confirmDelete,setConfirmDelete]=useState(false);

  // insights
  const insights=[];
  if(invoiceCount>=3) insights.push({text:t.insight_loyal,bg:"#f0fdf4",c:"#166534",dot:"#22c55e"});
  if(invoiceCount>=5) insights.push({text:t.insight_frequent,bg:"#eff6ff",c:"#1e40af",dot:"#3b82f6"});
  if(debt>0) insights.push({text:t.insight_hasDebt,bg:"#fef2f2",c:"#b91c1c",dot:"#ef4444"});
  if(totalSpent>10000) insights.push({text:t.insight_bigSpender,bg:"#faf5ff",c:"#6b21a8",dot:"#a855f7"});
  if(invoiceCount===0) insights.push({text:t.insight_new,bg:"#f0f9ff",c:"#0c4a6e",dot:"#0ea5e9"});

  const sc={paid:"#059669",unpaid:"#dc2626",partial:"#d97706"};
  const sb={paid:"#ecfdf5",unpaid:"#fef2f2",partial:"#fffbeb"};
  const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

  return(
    <div dir={rtl?"rtl":"ltr"} style={{paddingBottom:100}}>
      {/* Toolbar */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
        <button onClick={onBack} style={{background:"#f3f4f6",border:"none",padding:"8px 14px",borderRadius:10,fontSize:13,fontWeight:700,color:"#374151",cursor:"pointer"}}>{t.backToList}</button>
        <button onClick={()=>onEdit(customer)} style={{background:"#eff6ff",border:"none",padding:"8px 14px",borderRadius:10,fontSize:13,fontWeight:700,color:"#1d4ed8",cursor:"pointer"}}>✏ {t.editCustomer}</button>
        <button onClick={()=>setConfirmDelete(true)} style={{marginLeft:"auto",background:"#fef2f2",border:"1px solid #fecaca",padding:"8px 14px",borderRadius:10,fontSize:13,fontWeight:700,color:"#dc2626",cursor:"pointer"}}>🗑 {t.deleteCustomer}</button>
      </div>

      {/* نافذة تأكيد الحذف */}
      {confirmDelete&&(
        <div onClick={()=>setConfirmDelete(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)",padding:20}}>
          <div onClick={e=>e.stopPropagation()} dir={rtl?"rtl":"ltr"}
            style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:340,boxShadow:"0 24px 64px rgba(0,0,0,.2)",animation:"up .2s cubic-bezier(.22,1,.36,1)"}}>
            <div style={{width:52,height:52,borderRadius:16,background:"#fef2f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,marginBottom:16}}>🗑</div>
            <div style={{fontWeight:900,fontSize:17,color:"#111",marginBottom:8}}>{t.confirmDeleteTitle}</div>
            <div style={{fontSize:14,color:"#6b7280",lineHeight:1.6,marginBottom:20}}>{t.confirmDeleteMsg(customer.name)}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button onClick={()=>setConfirmDelete(false)}
                style={{padding:"13px",borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:700,color:"#6b7280",background:"#fff",cursor:"pointer"}}>
                {t.confirmNo}
              </button>
              <button onClick={()=>onDelete(customer.id)}
                style={{padding:"13px",borderRadius:12,border:"none",fontSize:14,fontWeight:800,color:"#fff",background:"#ef4444",cursor:"pointer",boxShadow:"0 4px 12px rgba(239,68,68,.35)"}}>
                {t.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile */}
      <div style={{...S.card({marginBottom:16,padding:"20px"})}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
          <Avatar name={customer.name} size={52}/>
          <div>
            <div style={{fontWeight:900,fontSize:19,color:"#111"}}>{customer.name}</div>
            {customer.phone&&<div style={{fontSize:13,color:"#6b7280",marginTop:2}}>📞 {customer.phone}</div>}
            <div style={{fontSize:12,color:"#9ca3af",marginTop:2}}>{invoiceCount} {t.invoiceCount} · {t.lastSeen}: {lastDate}</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div style={{background:"#f0fdf4",borderRadius:12,padding:"12px"}}>
            <div style={{fontSize:10,fontWeight:700,color:"#166534",textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{t.totalSpent}</div>
            <div style={{fontSize:18,fontWeight:900,color:"#166534"}}>{fmt(totalSpent,lang)}</div>
          </div>
          <div style={{background:debt>0?"#fef2f2":"#f0fdf4",borderRadius:12,padding:"12px"}}>
            <div style={{fontSize:10,fontWeight:700,color:debt>0?"#b91c1c":"#166534",textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{t.currentDebt}</div>
            <div style={{fontSize:18,fontWeight:900,color:debt>0?"#dc2626":"#059669"}}>{debt>0?fmt(debt,lang):"✓ 0 DA"}</div>
          </div>
        </div>
      </div>

      {/* Insights */}
      {insights.length>0&&(
        <div style={{marginBottom:16,display:"flex",flexDirection:"column",gap:8}}>
          {insights.map((ins,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:ins.bg,borderRadius:12}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:ins.dot,flexShrink:0}}/>
              <span style={{fontSize:13,fontWeight:600,color:ins.c}}>{ins.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Spend chart */}
      {custInvs.length>0&&(
        <div style={{...S.card({marginBottom:16})}}>
          <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:10}}>📊 Dépenses mensuelles</div>
          <MiniSpendChart customerInvoices={custInvs}/>
        </div>
      )}

      {/* Products bought */}
      {boughtItems.length>0&&(
        <div style={{...S.card({marginBottom:16})}}>
          <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:12}}>🛍 {t.boughtProducts}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {boughtItems.map(([name,qty])=>(
              <div key={name} style={{background:"#f9fafb",border:"1px solid #e5e7eb",borderRadius:20,padding:"5px 12px",display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:13,fontWeight:600,color:"#374151"}}>{name}</span>
                <span style={{fontSize:11,fontWeight:700,color:"#9ca3af"}}>×{qty}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoice history */}
      <div style={S.card()}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:700,color:"#374151"}}>🧾 {t.purchaseHistory}</div>
          <div style={{display:"flex",gap:6}}>
            {custInvs.length>0&&(
              <button onClick={()=>{
                const sc2={paid:"#059669",unpaid:"#dc2626",partial:"#d97706"};
                const sb2={paid:"#ecfdf5",unpaid:"#fef2f2",partial:"#fffbeb"};
                const totalAll=custInvs.reduce((s,i)=>s+i.total,0);
                const totalPaid=custInvs.filter(i=>i.payStatus==="paid").reduce((s,i)=>s+i.total,0);
                const totalReste=custInvs.filter(i=>i.payStatus!=="paid").reduce((s,i)=>s+(i.total-(i.paidAmount||0)),0);
                const rows=[...custInvs].sort((a,b)=>new Date(b.date)-new Date(a.date)).map((inv,i)=>`
                  <tr style="background:${i%2===0?"#fff":"#f8fafc"}">
                    <td style="padding:8px 10px;font-size:12px;font-family:monospace;color:#2563EB">${inv.id}</td>
                    <td style="padding:8px 10px;font-size:12px;color:#64748b">${inv.date}</td>
                    <td style="padding:8px 10px;font-size:12px">${inv.lines.map(l=>l.name).slice(0,2).join(", ")}${inv.lines.length>2?"...":""}</td>
                    <td style="padding:8px 10px;font-size:12px;text-align:right;font-weight:700">${inv.total.toLocaleString()} DA</td>
                    <td style="padding:8px 10px;font-size:11px;text-align:center">
                      <span style="padding:3px 10px;border-radius:20px;font-weight:700;background:${sb2[inv.payStatus]||"#f3f4f6"};color:${sc2[inv.payStatus]||"#374151"}">
                        ${inv.payStatus==="paid"?"Payé":inv.payStatus==="partial"?"Partiel":"Impayé"}
                      </span>
                    </td>
                    <td style="padding:8px 10px;font-size:12px;text-align:right;color:${inv.payStatus==="paid"?"#059669":"#dc2626"};font-weight:700">
                      ${inv.payStatus==="paid"?"—":(inv.total-(inv.paidAmount||0)).toLocaleString()+" DA"}
                    </td>
                  </tr>`).join("");
                const html=`<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Relevé — ${customer.name}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif;padding:32px;color:#1e293b}
  .page{max-width:860px;margin:0 auto}
  .header{padding-bottom:16px;border-bottom:3px solid #1e293b;margin-bottom:20px;display:flex;justify-content:space-between}
  .summary{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px}
  .sum-box{padding:14px;border-radius:8px;border:1px solid #e2e8f0}
  .sum-label{font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
  .sum-value{font-size:20px;font-weight:900}
  table{width:100%;border-collapse:collapse}
  thead tr{background:#1e293b;color:#fff}
  th{padding:10px;font-size:10px;text-transform:uppercase;letter-spacing:.8px;text-align:left}
  th:nth-child(4),th:nth-child(6){text-align:right} th:nth-child(5){text-align:center}
  .footer{margin-top:24px;text-align:center;font-size:10px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:12px}
  @media print{body{padding:20px}}
</style>
<script>window.onload=function(){window.print();}<\/script>
</head><body><div class="page">
<div class="header">
  <div>
    <div style="font-size:20px;font-weight:900">Relevé de compte</div>
    <div style="font-size:16px;font-weight:700;color:#2563EB;margin-top:4px">${customer.name}</div>
    <div style="font-size:12px;color:#64748b;margin-top:2px">${custInvs.length} facture(s) · ${new Date().toLocaleDateString("fr-DZ")}${customer.phone?" · "+customer.phone:""}</div>
  </div>
</div>
<div class="summary">
  <div class="sum-box" style="background:#eff6ff"><div class="sum-label">Total facturé</div><div class="sum-value" style="color:#2563EB">${totalAll.toLocaleString()} DA</div></div>
  <div class="sum-box" style="background:#ecfdf5"><div class="sum-label">Total payé</div><div class="sum-value" style="color:#059669">${totalPaid.toLocaleString()} DA</div></div>
  <div class="sum-box" style="background:${totalReste>0?"#fef2f2":"#ecfdf5"}"><div class="sum-label">Reste à payer</div><div class="sum-value" style="color:${totalReste>0?"#dc2626":"#059669"}">${totalReste>0?totalReste.toLocaleString()+" DA":"✓ Soldé"}</div></div>
</div>
<table>
  <thead><tr><th>N° Facture</th><th>Date</th><th>Articles</th><th style="text-align:right">Montant</th><th style="text-align:center">Statut</th><th style="text-align:right">Reste</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
<div class="footer">Document généré par Fawtara</div>
</div></body></html>`;
                const blob=new Blob([html],{type:"text/html"});
                const url=URL.createObjectURL(blob);
                window.open(url,"_blank");
                setTimeout(()=>URL.revokeObjectURL(url),10000);
              }}
                style={{padding:"6px 12px",background:"#6366f1",color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                🖨 Relevé
              </button>
            )}
            {custInvs.length>0&&(
              <button onClick={()=>{
                // نبني كل الفواتير في HTML واحد
                const bs2={}; // bizSettings غير متاح هنا — نستخدم ما في الفاتورة
                const allPages=custInvs.map((inv,idx)=>{
                  const rows=inv.lines.map(l=>`
                    <tr>
                      <td style="padding:9px 8px;border-bottom:1px solid #e2e8f0;font-size:13px">${l.name}</td>
                      <td style="padding:9px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:center">${l.qty||1}</td>
                      <td style="padding:9px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:center">${l.unite||"unité"}</td>
                      <td style="padding:9px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:right">${(parseFloat(l.price)||0).toLocaleString()} DA</td>
                      <td style="padding:9px 8px;border-bottom:1px solid #e2e8f0;font-size:13px;text-align:right;font-weight:700">${((parseFloat(l.price)||0)*(parseFloat(l.qty)||1)).toLocaleString()} DA</td>
                    </tr>`).join("");
                  const statusColor=inv.payStatus==="paid"?"#059669":inv.payStatus==="partial"?"#d97706":"#dc2626";
                  const statusLabel=inv.payStatus==="paid"?"✓ Payé":inv.payStatus==="partial"?"⏳ Partiel":"✗ Impayé";
                  return `
                  <div class="invoice-page" style="${idx>0?"page-break-before:always;":""}padding:32px">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;border-bottom:3px solid #1e293b;margin-bottom:20px">
                      <div>
                        <div style="font-size:18px;font-weight:900">${inv.companyName||"Fawtara"}</div>
                      </div>
                      <div style="text-align:right">
                        <div style="font-size:22px;font-weight:900;letter-spacing:-1px">FACTURE</div>
                        <div style="font-size:13px;font-family:monospace;color:#64748b">N° ${inv.id}</div>
                        <div style="font-size:12px;color:#64748b">${inv.date}</div>
                        <div style="margin-top:6px;padding:3px 12px;border-radius:4px;border:1.5px solid ${statusColor};color:${statusColor};font-weight:700;font-size:11px;display:inline-block">${statusLabel}</div>
                      </div>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
                      <div style="padding:12px 14px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0">
                        <div style="font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:5px">Acheteur</div>
                        <div style="font-size:15px;font-weight:700">${inv.customer}</div>
                        ${inv.customerInfo?.adresse?`<div style="font-size:11px;color:#64748b">${inv.customerInfo.adresse}</div>`:""}
                      </div>
                    </div>
                    <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
                      <thead><tr style="border-bottom:2px solid #1e293b">
                        <th style="padding:8px;font-size:10px;color:#64748b;text-transform:uppercase;text-align:left">Désignation</th>
                        <th style="padding:8px;font-size:10px;color:#64748b;text-transform:uppercase;text-align:center">Qté</th>
                        <th style="padding:8px;font-size:10px;color:#64748b;text-transform:uppercase;text-align:center">Unité</th>
                        <th style="padding:8px;font-size:10px;color:#64748b;text-transform:uppercase;text-align:right">Prix unit.</th>
                        <th style="padding:8px;font-size:10px;color:#64748b;text-transform:uppercase;text-align:right">Total</th>
                      </tr></thead>
                      <tbody>${rows}</tbody>
                    </table>
                    <div style="border:1.5px solid #e2e8f0;border-radius:6px;padding:14px 18px;margin-bottom:16px">
                      <div style="display:flex;justify-content:space-between;font-size:17px;font-weight:900;border-top:2px solid #1e293b;padding-top:10px">
                        <span>Total à payer</span>
                        <span>${inv.total.toLocaleString()} DA</span>
                      </div>
                    </div>
                    <div style="text-align:center;font-size:10px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:12px">
                      ${inv.companyName||"Fawtara"} · Document généré par Fawtara · Facture ${idx+1}/${custInvs.length}
                    </div>
                  </div>`;
                }).join("");

                const html=`<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Factures — ${customer.name}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif;color:#1e293b;background:#fff}
  @media print{
    .invoice-page{page-break-inside:avoid}
    @page{margin:15mm}
  }
</style>
<script>window.onload=function(){window.print();}<\/script>
</head><body>${allPages}</body></html>`;
                const blob=new Blob([html],{type:"text/html"});
                const url=URL.createObjectURL(blob);
                window.open(url,"_blank");
                setTimeout(()=>URL.revokeObjectURL(url),15000);
              }}
                style={{padding:"6px 12px",background:"#0ea5e9",color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                🖨 Toutes ({custInvs.length})
              </button>
            )}
            <button onClick={()=>onNewInvoice(customer.name)} style={{padding:"6px 12px",background:"#2563EB",color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer"}}>+ {t.newInvoice}</button>
          </div>
        </div>
        {custInvs.length===0?(
          <div style={{textAlign:"center",padding:"24px 0",color:"#9ca3af",fontSize:14}}>{t.noInvoices}</div>
        ):custInvs.map(inv=>(
          <div key={inv.id} onClick={()=>onOpenInvoice(inv)}
            style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",borderRadius:10,marginBottom:4,cursor:"pointer",border:"1px solid #f3f4f6",background:"#fff",transition:"box-shadow .15s"}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,.08)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:9,background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🧾</div>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:"#111"}}>{inv.id}</div>
                <div style={{fontSize:11,color:"#9ca3af"}}>{inv.date} · {inv.lines.map(l=>l.name).slice(0,2).join(", ")}</div>
              </div>
            </div>
            <div style={{textAlign:"right",display:"flex",alignItems:"center",gap:8}}>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:"#111"}}>{fmt(inv.total,lang)}</div>
                <span style={S.pill(sb[inv.payStatus],sc[inv.payStatus])}>● {t["status"+cap(inv.payStatus)]}</span>
              </div>
              <div style={{color:"#d1d5db",fontSize:14}}>›</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CUSTOMERS TAB
═══════════════════════════════════════════════ */
function CustomersTab({customers,invoices,txs,products,lang,onSelectCustomer,onNewCustomer,onNewInvoice}){
  const t=T[lang],rtl=lang==="ar";
  const [sort,setSort]=useState("spent");
  const [search,setSearch]=useState("");

  // Build enriched customer data
  const enriched=useMemo(()=>customers.map(c=>{
    const custInvs=invoices.filter(i=>i.customer===c.name);
    const totalSpent=custInvs.reduce((s,i)=>s+i.total,0);
    const totalPaid=custInvs.reduce((s,i)=>s+(i.paidAmount||0),0);
    const debt=totalSpent-totalPaid;
    const lastDate=custInvs.sort((a,b)=>new Date(b.date)-new Date(a.date))[0]?.date||null;
    return{...c,totalSpent,totalPaid,debt,lastDate,invoiceCount:custInvs.length};
  }),[customers,invoices]);

  const sorted=[...enriched].sort((a,b)=>{
    if(sort==="spent") return b.totalSpent-a.totalSpent;
    if(sort==="debt")  return b.debt-a.debt;
    if(sort==="recent") return new Date(b.lastDate||0)-new Date(a.lastDate||0);
    return 0;
  }).filter(c=>c.name?.toLowerCase().includes(search.toLowerCase())||c.phone?.includes(search));

  const totalRevenue=enriched.reduce((s,c)=>s+c.totalSpent,0);
  const totalDebt=enriched.reduce((s,c)=>s+c.debt,0);
  const top5=[...enriched].sort((a,b)=>b.totalSpent-a.totalSpent).slice(0,5);

  return(
    <div dir={rtl?"rtl":"ltr"}>
      {/* Summary cards */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
        {[
          {l:t.totalCustomers, v:customers.length,         bg:"#eff6ff",c:"#1d4ed8",icon:"👥"},
          {l:t.totalRevenue,   v:fmt(totalRevenue,lang),   bg:"#ecfdf5",c:"#065f46",icon:"💰"},
          {l:t.totalDebt,      v:fmt(totalDebt,lang),      bg:totalDebt>0?"#fef2f2":"#ecfdf5",c:totalDebt>0?"#b91c1c":"#065f46",icon:"⚠️"},
        ].map(s=>(
          <div key={s.l} style={{background:s.bg,borderRadius:14,padding:"12px 10px",textAlign:"center"}}>
            <div style={{fontSize:16,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:typeof s.v==="number"?20:11,fontWeight:900,color:s.c,lineHeight:1}}>{s.v}</div>
            <div style={{fontSize:9,fontWeight:700,color:s.c,opacity:.7,marginTop:4,textTransform:"uppercase",letterSpacing:.5}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Top 5 */}
      {top5.length>0&&(
        <div style={{...S.card({marginBottom:16})}}>
          <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:12}}>🏆 {t.topCustomers}</div>
          {top5.map((c,i)=>(
            <div key={c.id} onClick={()=>onSelectCustomer(c)} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<top5.length-1?"1px solid #f3f4f6":"none",cursor:"pointer"}}
              onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{width:24,height:24,borderRadius:8,background:["#fbbf24","#94a3b8","#c2853a","#6366f1","#10b981"][i],display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff",flexShrink:0}}>
                {i+1}
              </div>
              <Avatar name={c.name} size={32}/>
              <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:"#111"}}>{c.name}</div><div style={{fontSize:11,color:"#9ca3af"}}>{c.invoiceCount} facture(s)</div></div>
              <div style={{textAlign:"right"}}>
                <div style={{fontWeight:800,fontSize:13,color:"#059669"}}>{fmt(c.totalSpent,lang)}</div>
                {c.debt>0&&<div style={{fontSize:10,fontWeight:700,color:"#dc2626"}}>–{fmt(c.debt,lang)}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sort tabs + search */}
      <div style={{marginBottom:12}}>
        <div style={{position:"relative",marginBottom:10}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#9ca3af"}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Rechercher un client..."
            style={{...S.inp({paddingLeft:36,borderRadius:12})}}/>
          {search&&<button onClick={()=>setSearch("")}
            style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:"#9ca3af"}}>×</button>}
        </div>
        <div style={{display:"flex",gap:6}}>
          {[["spent","💰"],["debt","⚠"],["recent","🕒"]].map(([k,icon])=>(
            <button key={k} onClick={()=>setSort(k)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,background:sort===k?"#2563EB":"#f3f4f6",color:sort===k?"#fff":"#6b7280"}}>{icon}</button>
          ))}
          <button onClick={onNewCustomer} style={{marginLeft:"auto",padding:"6px 14px",background:"#2563EB",color:"#fff",border:"none",borderRadius:20,fontSize:12,fontWeight:700,cursor:"pointer"}}>+ {t.newCustomer.replace("+ ","")}</button>
        </div>
      </div>

      {sorted.length===0&&search?(
        <div style={{textAlign:"center",padding:"40px 0",color:"#9ca3af",fontSize:14}}>Aucun client pour "{search}"</div>
      ):sorted.length===0?(
        <div style={{textAlign:"center",padding:"60px 20px"}}>
          <div style={{fontSize:48,marginBottom:12}}>👥</div>
          <div style={{fontWeight:700,fontSize:16,color:"#374151",marginBottom:8}}>{t.noCustomers}</div>
          <button onClick={onNewCustomer} style={{padding:"12px 24px",background:"#2563EB",color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer"}}>{t.addFirstCustomer}</button>
        </div>
      ):(
        sorted.map(c=>(
          <div key={c.id} onClick={()=>onSelectCustomer(c)}
            style={{...S.card({marginBottom:10,cursor:"pointer",padding:"14px 16px",display:"flex",alignItems:"center",gap:12})}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,.1)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.06)"}>
            <Avatar name={c.name} size={42}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:15,color:"#111"}}>{c.name}</div>
              <div style={{fontSize:12,color:"#9ca3af",marginTop:2}}>
                {c.phone?`📞 ${c.phone} · `:""}
                {c.lastDate?`${t.lastSeen}: ${c.lastDate}`:""}
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontWeight:800,fontSize:14,color:"#059669"}}>{fmt(c.totalSpent,lang)}</div>
              {c.debt>0?(
                <div style={{marginTop:3,display:"flex",alignItems:"center",gap:3,justifyContent:"flex-end"}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#ef4444"}}/>
                  <span style={{fontSize:11,fontWeight:700,color:"#dc2626"}}>{fmt(c.debt,lang)}</span>
                </div>
              ):<div style={{fontSize:11,color:"#10b981",fontWeight:600,marginTop:2}}>✓ Soldé</div>}
            </div>
            <div style={{color:"#d1d5db",fontSize:14}}>›</div>
          </div>
        ))
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MONTANT EN LETTRES — المبلغ بالحروف (دينار جزائري)
═══════════════════════════════════════════════ */
const montantEnLettres=(n)=>{
  if(!n||n===0) return "zéro dinar";
  const u=["","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze","douze","treize","quatorze","quinze","seize","dix-sept","dix-huit","dix-neuf"];
  const d=["","","vingt","trente","quarante","cinquante","soixante","soixante","quatre-vingt","quatre-vingt"];
  const c2=(n)=>{
    if(n<20) return u[n];
    const di=Math.floor(n/10), un=n%10;
    if(di===7) return un===0?"soixante-dix":un===1?"soixante et onze":"soixante-"+u[10+un];
    if(di===9) return un===0?"quatre-vingt-dix":"quatre-vingt-"+u[10+un];
    return d[di]+(un===0&&di===8?"s":un===1&&di!==8?" et "+u[un]:un>0?"-"+u[un]:"");
  };
  const c3=(n)=>{
    if(n===0) return "";
    const cent=Math.floor(n/100), rest=n%100;
    let r=cent>1?u[cent]+" cent"+(rest===0?"s":""):cent===1?"cent":"";
    if(rest>0) r+=(r?" ":"")+c2(rest);
    return r;
  };
  const entier=Math.floor(n), dec=Math.round((n-entier)*100);
  let res="";
  if(entier>=1000000) res+=c3(Math.floor(entier/1000000))+" million"+(Math.floor(entier/1000000)>1?"s":"")+" ";
  if(entier>=1000) res+=c3(Math.floor((entier%1000000)/1000))+" mille ";
  res+=c3(entier%1000);
  res=res.trim()+" dinar"+(entier>1?"s":"");
  if(dec>0) res+=" et "+c2(dec)+" centime"+(dec>1?"s":"");
  return res.trim();
};

/* ═══════════════════════════════════════════════
   CALCUL DROIT DE TIMBRE — LF 2025 Art. 100
   paiement espèces uniquement
/* ═══════════════════════════════════════════════
   SETTINGS MODAL
═══════════════════════════════════════════════ */
function SettingsModal({companyName,settings,onSave,onClose,lang}){
  const t=T[lang],rtl=lang==="ar";
  const [name,setName]=useState(companyName);
  const [logo,setLogo]=useState(settings?.logo||"");
  const [nif,setNif]=useState(settings?.nif||"");
  const [nis,setNis]=useState(settings?.nis||"");
  const [rc,setRc]=useState(settings?.rc||"");
  const [activite,setActivite]=useState(settings?.activite||"");
  const [adresse,setAdresse]=useState(settings?.adresse||"");
  const [article,setArticle]=useState(settings?.article||"");
  const [tvaEnabled,setTvaEnabled]=useState(settings?.tvaEnabled||false);
  const [tvaRate,setTvaRate]=useState(settings?.tvaRate||19);
  const [timbreEnabled,setTimbreEnabled]=useState(settings?.timbreEnabled||false);
  const [invPrefix,setInvPrefix]=useState(settings?.invPrefix||"FAC");
  const [customUnites,setCustomUnites]=useState((settings?.customUnites||[]).join(", "));
  const ok=name.trim().length>0;

  const handleLogo=e=>{
    const file=e.target.files?.[0];
    if(!file) return;
    if(file.size>300000){alert("الصورة كبيرة جداً — اختر صورة أقل من 300KB");return;}
    const reader=new FileReader();
    reader.onload=ev=>setLogo(ev.target.result);
    reader.readAsDataURL(file);
  };

  const save=()=>{
    if(!ok)return;
    onSave(name.trim(),{logo,nif:nif.trim(),nis:nis.trim(),rc:rc.trim(),activite:activite.trim(),adresse:adresse.trim(),article:article.trim(),tvaEnabled,tvaRate,timbreEnabled,invPrefix:invPrefix.trim()||"FAC",invCounter:settings?.invCounter||1,blCounter:settings?.blCounter||1,bcCounter:settings?.bcCounter||1,customUnites:customUnites.split(",").map(u=>u.trim()).filter(Boolean)});
    onClose();
  };

  // aperçu calcul
  const exampleHT=50000;
  const exampleTVA=tvaEnabled?Math.round(exampleHT*tvaRate/100):0;
  const exampleTTC=exampleHT+exampleTVA;
  const exampleTimbre=timbreEnabled?calcTimbre(exampleTTC):0;

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200,backdropFilter:"blur(6px)"}}>
      <div onClick={e=>e.stopPropagation()} dir={rtl?"rtl":"ltr"}
        style={{background:"#fff",borderRadius:"22px 22px 0 0",padding:"0",width:"100%",maxWidth:520,maxHeight:"90svh",display:"flex",flexDirection:"column",animation:"up .22s cubic-bezier(.22,1,.36,1)"}}>

        {/* Header */}
        <div style={{padding:"18px 20px 14px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:10,background:"#f0f9ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>⚙️</div>
            <div style={{fontWeight:900,fontSize:16,color:"#111"}}>{t.settingsTitle}</div>
          </div>
          <button onClick={onClose} style={{background:"#f3f4f6",border:"none",width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:18,color:"#6b7280"}}>×</button>
        </div>

        <div style={{overflowY:"auto",flex:1,padding:"16px 20px"}}>

          {/* اسم الشركة */}
          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:"#374151",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>{t.companyNameLabel}</div>
            <input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder={t.companyNamePh}
              style={{...S.inp({fontSize:16,fontWeight:700,borderColor:ok?"#2563EB":"#e5e7eb"})}}/>
          </div>

          {/* Préfixe facture */}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:"#374151",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>🔢 Numérotation des factures</div>
            <div style={{display:"flex",alignItems:"center",gap:10,background:"#f9fafb",borderRadius:12,padding:"12px 14px",border:"1px solid #e5e7eb"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:10,color:"#6b7280",marginBottom:4}}>Préfixe</div>
                <input value={invPrefix} onChange={e=>setInvPrefix(e.target.value.toUpperCase())}
                  placeholder="FAC" maxLength={6}
                  style={{...S.inp({fontFamily:"monospace",fontWeight:700,fontSize:15})}}/>
              </div>
              <div style={{color:"#9ca3af",fontSize:18,fontWeight:300}}>—</div>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:10,color:"#6b7280",marginBottom:4}}>Exemple</div>
                <div style={{fontFamily:"monospace",fontWeight:700,fontSize:14,color:"#2563EB",background:"#eff6ff",padding:"8px 12px",borderRadius:8}}>
                  {invPrefix||"FAC"}-{new Date().getFullYear()}-{String(settings?.invCounter||1).padStart(4,"0")}
                </div>
              </div>
            </div>
          </div>

          {/* اللوغو */}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:"#374151",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>🖼 Logo — شعار المؤسسة</div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              {logo?(
                <div style={{position:"relative",flexShrink:0}}>
                  <img src={logo} alt="logo" style={{width:72,height:72,borderRadius:12,objectFit:"contain",border:"1.5px solid #e5e7eb",background:"#f9fafb",padding:4}}/>
                  <button onClick={()=>setLogo("")}
                    style={{position:"absolute",top:-6,right:-6,width:20,height:20,borderRadius:"50%",background:"#ef4444",border:"none",color:"#fff",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>×</button>
                </div>
              ):(
                <div style={{width:72,height:72,borderRadius:12,border:"2px dashed #e5e7eb",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,background:"#f9fafb",flexShrink:0}}>🖼</div>
              )}
              <div style={{flex:1}}>
                <label style={{display:"block",padding:"10px 14px",background:"#eff6ff",border:"1.5px solid #bfdbfe",borderRadius:10,fontSize:13,fontWeight:600,color:"#1d4ed8",cursor:"pointer",textAlign:"center"}}>
                  {logo?"تغيير الشعار":"رفع الشعار"}
                  <input type="file" accept="image/*" onChange={handleLogo} style={{display:"none"}}/>
                </label>
                <div style={{fontSize:10,color:"#9ca3af",marginTop:5,textAlign:"center"}}>PNG · JPG · max 300KB · يظهر في الفاتورة</div>
              </div>
            </div>
          </div>

          {/* معلومات قانونية */}
          <div style={{background:"#f9fafb",borderRadius:14,padding:14,marginBottom:16,border:"1px solid #e5e7eb"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:14,display:"flex",alignItems:"center",gap:6}}>
              📋 Informations légales — تظهر في كل فاتورة PDF
            </div>

            {/* NIF */}
            <div style={{marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,color:"#6b7280",marginBottom:4,textTransform:"uppercase",letterSpacing:.6}}>NIF — رقم التعريف الجبائي</div>
              <input value={nif} onChange={e=>setNif(e.target.value)} placeholder="000316123456789"
                style={{...S.inp({fontFamily:"monospace",fontSize:14})}}/>
            </div>

            {/* NIS */}
            <div style={{marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,color:"#6b7280",marginBottom:4,textTransform:"uppercase",letterSpacing:.6}}>NIS — رقم التعريف الإحصائي</div>
              <input value={nis} onChange={e=>setNis(e.target.value)} placeholder="099812001234567"
                style={{...S.inp({fontFamily:"monospace",fontSize:14})}}/>
            </div>

            {/* RC */}
            <div style={{marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,color:"#6b7280",marginBottom:4,textTransform:"uppercase",letterSpacing:.6}}>RC — رقم السجل التجاري</div>
              <input value={rc} onChange={e=>setRc(e.target.value)} placeholder="Ex: 16/00-0012345B19"
                style={{...S.inp({fontFamily:"monospace",fontSize:14})}}/>
            </div>

            {/* Article */}
            <div style={{marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,color:"#6b7280",marginBottom:4,textTransform:"uppercase",letterSpacing:.6}}>Article — رقم المادة الجبائية</div>
              <input value={article} onChange={e=>setArticle(e.target.value)} placeholder="Ex: 16123456789"
                style={{...S.inp({fontFamily:"monospace",fontSize:14})}}/>
            </div>

            {/* Activité */}
            <div style={{marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:700,color:"#6b7280",marginBottom:4,textTransform:"uppercase",letterSpacing:.6}}>Activité — طبيعة النشاط</div>
              <input value={activite} onChange={e=>setActivite(e.target.value)} placeholder="Ex: Commerce de détail, Import-Export..."
                style={S.inp()}/>
            </div>

            {/* Adresse */}
            <div style={{marginBottom:0}}>
              <div style={{fontSize:10,fontWeight:700,color:"#6b7280",marginBottom:4,textTransform:"uppercase",letterSpacing:.6}}>Adresse — العنوان الكامل</div>
              <input value={adresse} onChange={e=>setAdresse(e.target.value)} placeholder="Ex: 12 Rue Didouche Mourad, Alger"
                style={S.inp()}/>
            </div>
          </div>

          {/* Unités personnalisées */}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:"#374151",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>📦 Unités personnalisées</div>
            <div style={{background:"#f9fafb",borderRadius:12,padding:"12px 14px",border:"1px solid #e5e7eb"}}>
              <div style={{fontSize:11,color:"#6b7280",marginBottom:8}}>
                Unités disponibles par défaut : unité, kg, g, litre, m, m², carton, sac, boîte...
              </div>
              <input value={customUnites} onChange={e=>setCustomUnites(e.target.value)}
                placeholder="Ex: quintal, tonne, rouleau, bobine"
                style={S.inp({fontSize:13})}/>
              <div style={{fontSize:10,color:"#9ca3af",marginTop:5}}>Séparées par des virgules — apparaissent dans le menu Unité des factures</div>
            </div>
          </div>
          <div style={{background:"#f9fafb",borderRadius:14,padding:14,marginBottom:14,border:"1px solid #e5e7eb"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:tvaEnabled?12:0}}>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:"#111"}}>📊 TVA</div>
                <div style={{fontSize:11,color:"#6b7280"}}>Taxe sur la Valeur Ajoutée</div>
              </div>
              <button onClick={()=>setTvaEnabled(!tvaEnabled)}
                style={{padding:"6px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,
                  background:tvaEnabled?"#2563EB":"#e5e7eb",color:tvaEnabled?"#fff":"#6b7280"}}>
                {tvaEnabled?"Activé ✓":"Désactivé"}
              </button>
            </div>
            {tvaEnabled&&(
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"#374151",marginBottom:8}}>Taux :</div>
                <div style={{display:"flex",gap:8}}>
                  {[9,19].map(r=>(
                    <button key={r} onClick={()=>setTvaRate(r)}
                      style={{flex:1,padding:"10px",borderRadius:10,border:`1.5px solid ${tvaRate===r?"#2563EB":"#e5e7eb"}`,
                        background:tvaRate===r?"#eff6ff":"#fff",color:tvaRate===r?"#1d4ed8":"#6b7280",
                        fontSize:15,fontWeight:800,cursor:"pointer"}}>
                      {r}%
                    </button>
                  ))}
                </div>
                <div style={{fontSize:11,color:"#9ca3af",marginTop:8}}>9% = biens essentiels · 19% = taux général</div>
              </div>
            )}
          </div>

          {/* Droit de Timbre */}
          <div style={{background:"#f9fafb",borderRadius:14,padding:14,marginBottom:16,border:"1px solid #e5e7eb"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:timbreEnabled?12:0}}>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:"#111"}}>🪙 Droit de Timbre</div>
                <div style={{fontSize:11,color:"#6b7280"}}>Paiement espèces — LF 2025</div>
              </div>
              <button onClick={()=>setTimbreEnabled(!timbreEnabled)}
                style={{padding:"6px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,
                  background:timbreEnabled?"#059669":"#e5e7eb",color:timbreEnabled?"#fff":"#6b7280"}}>
                {timbreEnabled?"Activé ✓":"Désactivé"}
              </button>
            </div>
            {timbreEnabled&&(
              <div style={{background:"#ecfdf5",borderRadius:10,padding:"10px 12px",fontSize:12,color:"#065f46"}}>
                <div style={{fontWeight:700,marginBottom:6}}>Barème LF 2025 (Art. 100) :</div>
                <div>≤ 300 DA → Exonéré</div>
                <div>300 → 30 000 DA → 1% (min. 5 DA)</div>
                <div>30 001 → 100 000 DA → 1,5%</div>
                <div>&gt; 100 000 DA → 2%</div>
                <div style={{marginTop:6,fontWeight:700,color:"#b91c1c"}}>⚡ Paiement électronique = exonéré</div>
              </div>
            )}
          </div>

          {/* Aperçu */}
          {(tvaEnabled||timbreEnabled)&&(
            <div style={{background:"#eff6ff",borderRadius:12,padding:"12px 14px",marginBottom:16,border:"1px solid #bfdbfe"}}>
              <div style={{fontSize:11,fontWeight:700,color:"#1d4ed8",marginBottom:8,textTransform:"uppercase",letterSpacing:.6}}>Exemple — Facture de {exampleHT.toLocaleString()} DA HT</div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}><span style={{color:"#374151"}}>Montant HT</span><span style={{fontWeight:700}}>{exampleHT.toLocaleString()} DA</span></div>
              {tvaEnabled&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}><span style={{color:"#374151"}}>TVA {tvaRate}%</span><span style={{fontWeight:700,color:"#d97706"}}>+{exampleTVA.toLocaleString()} DA</span></div>}
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4,borderTop:"1px solid #bfdbfe",paddingTop:4}}><span style={{color:"#374151",fontWeight:700}}>Total TTC</span><span style={{fontWeight:800}}>{exampleTTC.toLocaleString()} DA</span></div>
              {timbreEnabled&&<div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}><span style={{color:"#374151"}}>Droit de Timbre</span><span style={{fontWeight:700,color:"#059669"}}>+{exampleTimbre.toLocaleString()} DA</span></div>}
              {timbreEnabled&&<div style={{display:"flex",justifyContent:"space-between",fontSize:14,borderTop:"1px solid #bfdbfe",paddingTop:4}}><span style={{fontWeight:800,color:"#111"}}>Total Final</span><span style={{fontWeight:900,color:"#2563EB"}}>{(exampleTTC+exampleTimbre).toLocaleString()} DA</span></div>}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{padding:"12px 20px 24px",borderTop:"1px solid #f3f4f6",display:"grid",gridTemplateColumns:"1fr 2fr",gap:10,flexShrink:0}}>
          <button onClick={onClose} style={{padding:14,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>{t.cancel}</button>
          <button onClick={save} style={{padding:14,borderRadius:12,border:"none",fontSize:15,fontWeight:800,cursor:ok?"pointer":"default",background:ok?"#2563EB":"#e5e7eb",color:ok?"#fff":"#9ca3af"}}>{t.save}</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   REFERRAL NOTIF — إشعار للمُحيل: صديقك سجّل!
═══════════════════════════════════════════════ */
function ReferralNotif({referral,onClose,lang}){
  const t=T[lang],rtl=lang==="ar";
  const [ccp,setCcp]=useState(referral.ccp||"");
  const [wa,setWa]=useState(referral.whatsapp||"");
  const [sent,setSent]=useState(!!referral.ccp);

  const send=async()=>{
    if(!ccp.trim()&&!wa.trim()) return;
    await setRefCCP(referral.newUser,ccp.trim(),wa.trim());
    await markRefSeenByReferrer(referral.newUser);
    setSent(true);
    setTimeout(onClose,2000);
  };

  // "Plus tard" — لا يُعلّم كمرئي، سيظهر مجدداً عند الدخول التالي
  const later=()=>onClose();

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,backdropFilter:"blur(6px)",padding:20}}>
      <div dir={rtl?"rtl":"ltr"} style={{background:"#fff",borderRadius:22,padding:28,width:"100%",maxWidth:360,boxShadow:"0 32px 80px rgba(0,0,0,.25)",animation:"up .22s cubic-bezier(.22,1,.36,1)"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:52,marginBottom:10}}>🎉</div>
          <div style={{fontWeight:900,fontSize:18,color:"#111",marginBottom:6}}>{t.refNotif}</div>
          <div style={{fontSize:14,color:"#6b7280",lineHeight:1.5}}>{t.refNotifSub(referral.newUser)}</div>
        </div>

        {!sent?(
          <>
            <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:12,padding:"12px 14px",marginBottom:16,fontSize:13,color:"#92400e",fontWeight:600,lineHeight:1.5}}>
              💰 {t.refFillInfo}
            </div>
            <input value={ccp} onChange={e=>setCcp(e.target.value)} placeholder={t.refCCPPh} style={S.inp({marginBottom:8})}/>
            <input value={wa} onChange={e=>setWa(e.target.value)} placeholder={t.refWAPh} style={S.inp({marginBottom:20})}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:10}}>
              <button onClick={later} style={{padding:13,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>Plus tard</button>
              <button onClick={send} style={{padding:13,borderRadius:12,border:"none",fontSize:14,fontWeight:800,color:"#fff",background:"#2563EB",cursor:"pointer",boxShadow:"0 4px 14px rgba(37,99,235,.35)"}}>{t.refSend}</button>
            </div>
          </>
        ):(
          <div style={{textAlign:"center",padding:"12px 0"}}>
            <div style={{fontSize:20,fontWeight:800,color:"#059669",marginBottom:6}}>✓ {t.refSent}</div>
            <div style={{fontSize:13,color:"#9ca3af"}}>Nous vous contacterons bientôt</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   REFERRAL PANEL — لوحة الإحالة (زر 🔗)
   يُظهر الرابط الخاص + قائمة المدعوّين
═══════════════════════════════════════════════ */
function ReferralPanel({user,lang,onClose}){
  const t=T[lang],rtl=lang==="ar";
  const [copied,setCopied]=useState(false);
  const [myRefs,setMyRefs]=useState([]);
  const [pendingRefs,setPendingRefs]=useState([]); // إحالات لم يُملأ فيها CCP
  const refLink=buildRefLink(user.refCode||"");

  // مرحلة التحقق من كلمة المرور
  const [authStep,setAuthStep]=useState(false); // هل نعرض نافذة كلمة المرور؟
  const [passInput,setPassInput]=useState("");
  const [passErr,setPassErr]=useState(false);
  const [showFillForm,setShowFillForm]=useState(false); // هل نعرض نموذج CCP؟
  const [ccp,setCcp]=useState("");
  const [wa,setWa]=useState("");
  const [sent,setSent]=useState(false);
  const [activRef,setActivRef]=useState(null); // الإحالة النشطة للملء

  useEffect(()=>{
    getReferrals().then(all=>{
      const mine=all.filter(r=>r.referrer===user.username);
      setMyRefs(mine);
      setPendingRefs(mine.filter(r=>!r.ccp));
    });
  },[]);

  // التحقق من كلمة المرور
  const verifyPass=async()=>{
    const acc=await getAccount(user.username);
    if(acc&&acc.password===passInput){
      setPassErr(false);
      setAuthStep(false);
      setShowFillForm(true);
      setCcp(""); setWa("");
    } else {
      setPassErr(true);
      setTimeout(()=>setPassErr(false),1500);
    }
  };

  // حفظ البيانات
  const saveCCPData=async()=>{
    if(!ccp.trim()&&!wa.trim()) return;
    // حفظ لكل الإحالات التي لم تُملأ بعد
    for(const r of pendingRefs){
      await setRefCCP(r.newUser,ccp.trim(),wa.trim());
      await markRefSeenByReferrer(r.newUser);
    }
    setSent(true);
    // تحديث القائمة
    getReferrals().then(all=>setMyRefs(all.filter(r=>r.referrer===user.username)));
    setTimeout(()=>{setShowFillForm(false);setSent(false);},2000);
  };

  const copyLink=()=>{
    try{
      const ta=document.createElement("textarea");
      ta.value=refLink; ta.style.cssText="position:fixed;opacity:0";
      document.body.appendChild(ta); ta.focus(); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }catch{}
    setCopied(true); setTimeout(()=>setCopied(false),2500);
  };

  const shareWA=()=>{
    const msg=encodeURIComponent(
      `💼 Gère ton commerce facilement avec Fawtara !\n\n` +
      `✅ Factures professionnelles\n✅ Suivi clients & dettes\n✅ Paiement unique — à vie\n\n` +
      `👉 ${refLink}\n\n` +
      `Pour payer et activer ton compte, contacte le développeur :\n📞 wa.me/${getAdminWA()}`
    );
    window.open(`https://wa.me/?text=${msg}`,"_blank");
  };

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300,backdropFilter:"blur(6px)"}}>
      <div onClick={e=>e.stopPropagation()} dir={rtl?"rtl":"ltr"}
        style={{background:"#fff",borderRadius:"22px 22px 0 0",width:"100%",maxWidth:480,maxHeight:"88svh",display:"flex",flexDirection:"column",animation:"up .22s cubic-bezier(.22,1,.36,1)"}}>

        <div style={{padding:"18px 20px 14px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{fontWeight:900,fontSize:17,color:"#111"}}>🔗 {t.refTitle}</div>
          <button onClick={onClose} style={{background:"#f3f4f6",border:"none",width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:18,color:"#6b7280"}}>×</button>
        </div>

        <div style={{overflowY:"auto",flex:1,padding:20}}>

          {/* رابط الدعوة */}
          <div style={{background:"linear-gradient(135deg,#eff6ff,#dbeafe)",borderRadius:18,padding:20,marginBottom:20}}>
            <div style={{fontSize:12,fontWeight:700,color:"#1d4ed8",marginBottom:10,textTransform:"uppercase",letterSpacing:.8}}>{t.myRefCode}</div>
            <div style={{background:"#fff",borderRadius:12,padding:"10px 14px",fontFamily:"monospace",fontSize:13,color:"#374151",marginBottom:14,wordBreak:"break-all",border:"1px solid #bfdbfe",lineHeight:1.6}}>
              {refLink}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={copyLink}
                style={{flex:1,padding:"11px",background:copied?"#ecfdf5":"#fff",border:`1.5px solid ${copied?"#10B981":"#bfdbfe"}`,borderRadius:11,fontSize:13,fontWeight:700,cursor:"pointer",color:copied?"#059669":"#1d4ed8"}}>
                {copied?t.refCopied:t.refCopy} 📋
              </button>
              <button onClick={shareWA}
                style={{flex:1,padding:"11px",background:"#25D366",border:"none",borderRadius:11,fontSize:13,fontWeight:700,cursor:"pointer",color:"#fff"}}>
                واتساب 📲
              </button>
            </div>
          </div>

          {/* خطوات كيف تربح */}
          <div style={{background:"linear-gradient(135deg,#ecfdf5,#d1fae5)",borderRadius:14,padding:16,marginBottom:20,border:"1px solid #a7f3d0"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#065f46",marginBottom:12}}>🤑 Comment gagner 1 000 DA ?</div>
            {[
              {step:"①",text:"Partagez votre lien d'invitation",sub:"Via WhatsApp, Facebook..."},
              {step:"②",text:"Votre ami s'inscrit via votre lien",sub:"Et active son compte"},
              {step:"③",text:"Vous recevez une notification 🎉",sub:"Entrez votre CCP et WhatsApp"},
              {step:"④",text:"Recevez 1 000 DA sur votre CCP !",sub:"Versement dans les 48h",hl:true},
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",gap:10,marginBottom:i<3?10:0,padding:s.hl?"10px 12px":"6px 0",background:s.hl?"#059669":"transparent",borderRadius:s.hl?10:0}}>
                <div style={{width:24,height:24,borderRadius:8,background:s.hl?"rgba(255,255,255,.25)":"#059669",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#fff",flexShrink:0}}>{s.step}</div>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:s.hl?"#fff":"#065f46"}}>{s.text}</div>
                  <div style={{fontSize:11,color:s.hl?"rgba(255,255,255,.8)":"#6b7280"}}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* بانر الإحالات المعلقة — إذا لم يملأ CCP بعد */}
          {pendingRefs.length>0&&!showFillForm&&(
            <div style={{background:"#fffbeb",borderRadius:14,padding:16,marginBottom:20,border:"1.5px solid #fde68a"}}>
              <div style={{fontWeight:800,fontSize:14,color:"#92400e",marginBottom:6}}>
                💰 {pendingRefs.length} invitation(s) en attente de vos coordonnées
              </div>
              <div style={{fontSize:12,color:"#92400e",marginBottom:12,lineHeight:1.5}}>
                Entrez votre CCP et WhatsApp pour recevoir votre commission.
              </div>
              <button onClick={()=>setAuthStep(true)}
                style={{width:"100%",padding:"11px",background:"#f59e0b",border:"none",borderRadius:11,fontSize:14,fontWeight:800,cursor:"pointer",color:"#fff"}}>
                💳 Entrer mes coordonnées
              </button>
            </div>
          )}

          {/* نموذج ملء البيانات بعد التحقق */}
          {showFillForm&&(
            <div style={{background:"#eff6ff",borderRadius:14,padding:16,marginBottom:20,border:"1.5px solid #bfdbfe",animation:"up .2s cubic-bezier(.22,1,.36,1)"}}>
              <div style={{fontWeight:800,fontSize:14,color:"#1d4ed8",marginBottom:12}}>💳 Mes coordonnées de paiement</div>
              {!sent?(
                <>
                  <input value={ccp} onChange={e=>setCcp(e.target.value)} placeholder={t.refCCPPh} style={S.inp({marginBottom:8})} autoFocus/>
                  <input value={wa} onChange={e=>setWa(e.target.value)} placeholder={t.refWAPh} style={S.inp({marginBottom:14})}/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:8}}>
                    <button onClick={()=>setShowFillForm(false)} style={{padding:"11px",borderRadius:11,border:"1.5px solid #bfdbfe",fontSize:13,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>Annuler</button>
                    <button onClick={saveCCPData} disabled={!ccp.trim()&&!wa.trim()}
                      style={{padding:"11px",borderRadius:11,border:"none",fontSize:14,fontWeight:800,color:"#fff",background:"#2563EB",cursor:"pointer"}}>
                      {t.refSend}
                    </button>
                  </div>
                </>
              ):(
                <div style={{textAlign:"center",padding:"8px 0",fontSize:15,fontWeight:800,color:"#059669"}}>✓ {t.refSent}</div>
              )}
            </div>
          )}

          {/* قائمة المدعوّين */}
          <div style={{fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:.8,marginBottom:12}}>
            👥 {t.refInvited} ({myRefs.length})
          </div>
          {myRefs.length===0?(
            <div style={{textAlign:"center",padding:"24px 0",color:"#9ca3af",fontSize:14}}>{t.refNoInvites}</div>
          ):myRefs.map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px",background:r.ccp?"#f0fdf4":"#f9fafb",borderRadius:12,marginBottom:8,border:`1px solid ${r.ccp?"#a7f3d0":"#e5e7eb"}`}}>
              <div style={{width:36,height:36,borderRadius:10,background:r.ccp?"#dcfce7":"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                {r.ccp?"✅":"⏳"}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:14,color:"#111"}}>@{r.newUser}</div>
                <div style={{fontSize:11,color:"#9ca3af"}}>{new Date(r.date).toLocaleDateString()}</div>
              </div>
              <div style={{textAlign:"right",fontSize:11,color:"#6b7280"}}>
                {r.ccp?<><div style={{color:"#059669",fontWeight:700}}>CCP: {r.ccp}</div><div>📞 {r.whatsapp}</div></>:<span style={{color:"#d97706",fontWeight:600}}>En attente</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* نافذة التحقق من كلمة المرور */}
      {authStep&&(
        <div onClick={()=>setAuthStep(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,backdropFilter:"blur(6px)",padding:20}}>
          <div onClick={e=>e.stopPropagation()} dir={rtl?"rtl":"ltr"}
            style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:340,boxShadow:"0 24px 64px rgba(0,0,0,.25)",animation:"up .2s cubic-bezier(.22,1,.36,1)"}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:40,marginBottom:8}}>🔐</div>
              <div style={{fontWeight:900,fontSize:16,color:"#111",marginBottom:4}}>Confirmer votre identité</div>
              <div style={{fontSize:13,color:"#6b7280"}}>Entrez votre mot de passe pour continuer</div>
            </div>
            <input
              autoFocus
              type="password"
              value={passInput}
              onChange={e=>setPassInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&verifyPass()}
              placeholder="••••••••"
              style={S.inp({marginBottom:16,borderColor:passErr?"#ef4444":"#e5e7eb",fontSize:16,textAlign:"center",letterSpacing:4})}
            />
            {passErr&&<div style={{color:"#dc2626",fontSize:13,fontWeight:600,textAlign:"center",marginBottom:12}}>Mot de passe incorrect</div>}
            <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:10}}>
              <button onClick={()=>setAuthStep(false)} style={{padding:13,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>{t.cancel}</button>
              <button onClick={verifyPass} style={{padding:13,borderRadius:12,border:"none",fontSize:14,fontWeight:800,color:"#fff",background:"#2563EB",cursor:"pointer"}}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   FOURNISSEURS TAB
═══════════════════════════════════════════════ */
function FournisseursTab({fournisseurs,txs,products,lang,onSave,onDelete,onAddTx,onUpdateStock,onPayDette}){
  const t=T[lang];
  const [selected,setSelected]=useState(null);
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState(null);
  const [search,setSearch]=useState("");
  const [showAchat,setShowAchat]=useState(false);

  // إجماليات لكل مورد
  const enriched=fournisseurs.map(f=>{
    const fTxs=txs.filter(tx=>tx.fournisseurId===f.id&&tx.type==="expense");
    const totalAchats=fTxs.reduce((s,tx)=>s+tx.amount,0);
    const totalPaye=fTxs.filter(tx=>tx.paid).reduce((s,tx)=>s+tx.amount,0);
    const dette=totalAchats-totalPaye;
    return{...f,totalAchats,totalPaye,dette,txCount:fTxs.length,fTxs};
  });

  const filtered=enriched.filter(f=>f.name?.toLowerCase().includes(search.toLowerCase())||f.phone?.includes(search));
  const totalDette=enriched.reduce((s,f)=>s+f.dette,0);
  const totalAchats=enriched.reduce((s,f)=>s+f.totalAchats,0);

  if(selected){
    const f=enriched.find(x=>x.id===selected.id)||selected;
    return <FournisseurDetail
      fournisseur={f} txs={f.fTxs||[]} products={products} lang={lang}
      onBack={()=>setSelected(null)}
      onEdit={()=>{setEditing(f);setShowForm(true);setSelected(null);}}
      onDelete={()=>{onDelete(f.id);setSelected(null);}}
      onAddAchat={(tx)=>{onAddTx(tx);}}
      onUpdateStock={onUpdateStock}
      onPayDette={(txId,montant)=>onPayDette(txId,montant,f.id)}
    />;
  }

  return(
    <div>
      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
        {[
          {l:"Fournisseurs",v:fournisseurs.length,bg:"#eff6ff",c:"#1d4ed8",icon:"🏭"},
          {l:"Total achats",v:fmt(totalAchats,lang),bg:"#fef3c7",c:"#92400e",icon:"🛒"},
          {l:"Dettes",v:fmt(totalDette,lang),bg:totalDette>0?"#fef2f2":"#ecfdf5",c:totalDette>0?"#b91c1c":"#065f46",icon:"⚠️"},
        ].map(s=>(
          <div key={s.l} style={{background:s.bg,borderRadius:14,padding:"12px 10px",textAlign:"center"}}>
            <div style={{fontSize:16,marginBottom:4}}>{s.icon}</div>
            <div style={{fontSize:typeof s.v==="number"?20:11,fontWeight:900,color:s.c,lineHeight:1}}>{s.v}</div>
            <div style={{fontSize:9,fontWeight:700,color:s.c,opacity:.7,marginTop:4,textTransform:"uppercase",letterSpacing:.5}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* البحث + إضافة */}
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <div style={{position:"relative",flex:1}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#9ca3af"}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Rechercher un fournisseur..."
            style={{...S.inp({paddingLeft:36})}}/>
        </div>
        <button onClick={()=>{setEditing(null);setShowForm(true);}}
          style={{padding:"10px 16px",background:"#2563EB",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
          + Nouveau
        </button>
      </div>

      {/* قائمة الموردين */}
      {filtered.length===0?(
        <div style={{textAlign:"center",padding:"60px 20px"}}>
          <div style={{fontSize:48,marginBottom:12}}>🏭</div>
          <div style={{fontWeight:700,fontSize:16,color:"#374151",marginBottom:8}}>Aucun fournisseur</div>
          <button onClick={()=>setShowForm(true)} style={{padding:"12px 24px",background:"#2563EB",color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer"}}>+ Ajouter un fournisseur</button>
        </div>
      ):filtered.map(f=>(
        <div key={f.id} onClick={()=>setSelected(f)}
          style={{...S.card({marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:12})}}
          onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,.1)"}
          onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.06)"}>
          <div style={{width:44,height:44,borderRadius:12,background:"#fef3c7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>🏭</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,fontSize:15,color:"#111"}}>{f.name}</div>
            <div style={{fontSize:12,color:"#9ca3af",marginTop:2}}>
              {f.phone?`📞 ${f.phone} · `:""}
              {f.txCount} achat(s)
            </div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontWeight:800,fontSize:14,color:"#d97706"}}>{fmt(f.totalAchats,lang)}</div>
            {f.dette>0?(
              <div style={{fontSize:11,fontWeight:700,color:"#dc2626",marginTop:2}}>Dette: {fmt(f.dette,lang)}</div>
            ):<div style={{fontSize:11,color:"#10b981",fontWeight:600,marginTop:2}}>✓ Soldé</div>}
          </div>
          <div style={{color:"#d1d5db",fontSize:14}}>›</div>
        </div>
      ))}

      {/* Modal ajout/modif fournisseur */}
      {showForm&&(
        <FournisseurModal
          existing={editing}
          onSave={f=>{onSave(f);setShowForm(false);setEditing(null);showToast&&showToast("Fournisseur sauvegardé ✓");}}
          onClose={()=>{setShowForm(false);setEditing(null);}}
          lang={lang}
        />
      )}
    </div>
  );
}

function FournisseurModal({existing,onSave,onClose,lang}){
  const [name,setName]=useState(existing?.name||"");
  const [phone,setPhone]=useState(existing?.phone||"");
  const [adresse,setAdresse]=useState(existing?.adresse||"");
  const [nif,setNif]=useState(existing?.nif||"");
  const [rc,setRc]=useState(existing?.rc||"");
  const ok=name.trim();
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:200,backdropFilter:"blur(6px)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:"20px 20px 0 0",padding:"0",width:"100%",maxWidth:480,maxHeight:"88svh",display:"flex",flexDirection:"column",animation:"up .22s cubic-bezier(.22,1,.36,1)"}}>
        <div style={{padding:"18px 20px 14px",borderBottom:"1px solid #f3f4f6",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{fontWeight:900,fontSize:17,color:"#111"}}>🏭 {existing?"Modifier":"Nouveau fournisseur"}</div>
          <button onClick={onClose} style={{background:"#f3f4f6",border:"none",width:32,height:32,borderRadius:8,cursor:"pointer",fontSize:18,color:"#6b7280"}}>×</button>
        </div>
        <div style={{overflowY:"auto",flex:1,padding:"16px 20px"}}>
          <input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Nom du fournisseur" style={S.inp({marginBottom:10,fontSize:16,fontWeight:600})}/>
          <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Téléphone / WhatsApp" style={S.inp({marginBottom:10})}/>
          <input value={adresse} onChange={e=>setAdresse(e.target.value)} placeholder="Adresse" style={S.inp({marginBottom:10})}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
            <input value={nif} onChange={e=>setNif(e.target.value)} placeholder="NIF (optionnel)" style={S.inp({fontFamily:"monospace",fontSize:13})}/>
            <input value={rc} onChange={e=>setRc(e.target.value)} placeholder="RC (optionnel)" style={S.inp({fontFamily:"monospace",fontSize:13})}/>
          </div>
        </div>
        <div style={{padding:"12px 20px 24px",borderTop:"1px solid #f3f4f6",display:"grid",gridTemplateColumns:"1fr 2fr",gap:10,flexShrink:0}}>
          <button onClick={onClose} style={{padding:14,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>Annuler</button>
          <button onClick={()=>{if(!ok)return;onSave({id:existing?.id||uid(),name:name.trim(),phone:phone.trim(),adresse:adresse.trim(),nif:nif.trim(),rc:rc.trim()});onClose();}}
            style={{padding:14,borderRadius:12,border:"none",fontSize:15,fontWeight:800,cursor:ok?"pointer":"default",background:ok?"#2563EB":"#e5e7eb",color:ok?"#fff":"#9ca3af"}}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}

function FournisseurDetail({fournisseur,txs,products,lang,onBack,onEdit,onDelete,onAddAchat,onUpdateStock,onPayDette}){
  const [showAchat,setShowAchat]=useState(false);
  const [confirmDel,setConfirmDel]=useState(false);
  const [achatPaid,setAchatPaid]=useState(true);
  const [achatDesc,setAchatDesc]=useState("");
  const [lignes,setLignes]=useState([{id:uid(),produit:"",qty:"",prix:""}]);
  const [selectedTx,setSelectedTx]=useState(null);
  const [payModal,setPayModal]=useState(null); // tx à payer
  const [payAmt,setPayAmt]=useState("");

  const totalAchats=txs.reduce((s,tx)=>s+tx.amount,0);
  const totalPaye=txs.filter(tx=>tx.paid).reduce((s,tx)=>s+tx.amount,0);
  const dette=totalAchats-totalPaye;

  const addLigne=()=>setLignes(l=>[...l,{id:uid(),produit:"",qty:"",prix:""}]);
  const updLigne=(id,f,v)=>setLignes(l=>l.map(x=>x.id===id?{...x,[f]:v}:x));
  const remLigne=id=>setLignes(l=>l.filter(x=>x.id!==id));

  const totalCalc=lignes.reduce((s,l)=>{
    const qty=parseFloat(l.qty)||1;
    const prix=parseFloat(l.prix)||0;
    return s+qty*prix;
  },0);

  // يكفي أن يكون هناك منتج بكمية — السعر اختياري
  const canSubmit=lignes.some(l=>l.produit.trim()&&parseFloat(l.qty)>0);

  const submitAchat=()=>{
    if(!canSubmit) return;
    const validLines=lignes.filter(l=>l.produit.trim()&&parseFloat(l.qty)>0);
    const montant=validLines.reduce((s,l)=>s+(parseFloat(l.prix)||0)*(parseFloat(l.qty)||1),0);
    if(montant<=0&&totalCalc<=0){alert("Veuillez saisir un prix pour au moins un produit");return;}
    const tx={
      id:uid(), type:"expense",
      amount:montant,
      desc:achatDesc||validLines.map(l=>l.produit).join(", "),
      client:fournisseur.name, date:today(), paid:achatPaid,
      fournisseurId:fournisseur.id,
      lignes:validLines,
    };
    onAddAchat(tx);
    validLines.forEach(l=>{
      const prod=products.find(p=>p.name.toLowerCase()===l.produit.toLowerCase());
      if(prod&&parseFloat(l.qty)>0) onUpdateStock(prod.id,parseFloat(l.qty));
    });
    setLignes([{id:uid(),produit:"",qty:"",prix:""}]);
    setAchatDesc(""); setShowAchat(false);
  };

  return(
    <div>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
        <button onClick={onBack} style={{background:"#f3f4f6",border:"none",padding:"8px 14px",borderRadius:10,fontSize:13,fontWeight:700,color:"#374151",cursor:"pointer"}}>← Retour</button>
        <button onClick={onEdit} style={{background:"#eff6ff",border:"none",padding:"8px 14px",borderRadius:10,fontSize:13,fontWeight:700,color:"#1d4ed8",cursor:"pointer"}}>✏ Modifier</button>
        <button onClick={()=>setConfirmDel(true)} style={{marginLeft:"auto",background:"#fef2f2",border:"1px solid #fecaca",padding:"8px 14px",borderRadius:10,fontSize:13,fontWeight:700,color:"#dc2626",cursor:"pointer"}}>🗑 Supprimer</button>
      </div>

      {/* Infos fournisseur */}
      <div style={S.card({marginBottom:16})}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
          <div style={{width:52,height:52,borderRadius:14,background:"#fef3c7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>🏭</div>
          <div>
            <div style={{fontWeight:900,fontSize:18,color:"#111"}}>{fournisseur.name}</div>
            {fournisseur.phone&&<div style={{fontSize:13,color:"#6b7280",marginTop:2}}>📞 {fournisseur.phone}</div>}
          </div>
          {fournisseur.phone&&(
            <a href={`https://wa.me/${fournisseur.phone.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"
              style={{marginLeft:"auto",background:"#25D366",color:"#fff",border:"none",padding:"8px 16px",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer",textDecoration:"none"}}>
              📲 WhatsApp
            </a>
          )}
        </div>
        {(fournisseur.adresse||fournisseur.nif||fournisseur.rc)&&(
          <div style={{fontSize:12,color:"#6b7280",lineHeight:1.8,fontFamily:"monospace",background:"#f9fafb",borderRadius:8,padding:"8px 12px"}}>
            {fournisseur.adresse&&<div>{fournisseur.adresse}</div>}
            {fournisseur.nif&&<div>NIF: {fournisseur.nif}</div>}
            {fournisseur.rc&&<div>RC: {fournisseur.rc}</div>}
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
        {[
          {l:"Total achats",v:fmt(totalAchats,lang),bg:"#fef3c7",c:"#92400e"},
          {l:"Payé",v:fmt(totalPaye,lang),bg:"#ecfdf5",c:"#065f46"},
          {l:"Dette",v:fmt(dette,lang),bg:dette>0?"#fef2f2":"#ecfdf5",c:dette>0?"#b91c1c":"#065f46"},
        ].map(s=>(
          <div key={s.l} style={{background:s.bg,borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
            <div style={{fontWeight:900,fontSize:15,color:s.c}}>{s.v}</div>
            <div style={{fontSize:9,fontWeight:700,color:s.c,opacity:.7,marginTop:4,textTransform:"uppercase"}}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* زر إضافة شراء */}
      <button onClick={()=>setShowAchat(!showAchat)}
        style={{width:"100%",padding:"12px",background:showAchat?"#e5e7eb":"#2563EB",color:showAchat?"#374151":"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:800,cursor:"pointer",marginBottom:14,boxShadow:showAchat?"none":"0 4px 12px rgba(37,99,235,.3)"}}>
        {showAchat?"✕ Annuler":"🛒 Enregistrer un achat"}
      </button>

      {/* فورم الشراء — متعدد المنتجات */}
      {showAchat&&(
        <div style={{background:"#eff6ff",borderRadius:14,padding:16,marginBottom:16,border:"1.5px solid #bfdbfe",animation:"up .2s cubic-bezier(.22,1,.36,1)"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#1d4ed8",marginBottom:12}}>🛒 Nouvel achat</div>

          {/* رأس الجدول */}
          <div style={{display:"grid",gridTemplateColumns:"2fr 60px 80px 24px",gap:6,marginBottom:6}}>
            <div style={{fontSize:10,fontWeight:700,color:"#6b7280",textTransform:"uppercase"}}>Produit</div>
            <div style={{fontSize:10,fontWeight:700,color:"#6b7280",textTransform:"uppercase",textAlign:"center"}}>Qté</div>
            <div style={{fontSize:10,fontWeight:700,color:"#6b7280",textTransform:"uppercase",textAlign:"right"}}>Prix unit.</div>
            <div/>
          </div>

          {/* صفوف المنتجات */}
          {lignes.map((l,i)=>(
            <div key={l.id} style={{marginBottom:6}}>
              <div style={{display:"grid",gridTemplateColumns:"2fr 60px 80px 24px",gap:6,alignItems:"center"}}>
                <div style={{position:"relative"}}>
                  <input value={l.produit} onChange={e=>updLigne(l.id,"produit",e.target.value)}
                    placeholder="Nom du produit..." list={`prod-list-${l.id}`}
                    style={{...S.inp({fontSize:13}),width:"100%"}}/>
                  <datalist id={`prod-list-${l.id}`}>
                    {products.map(p=><option key={p.id} value={p.name}/>)}
                  </datalist>
                </div>
                <input type="text" inputMode="decimal" value={l.qty} onChange={e=>updLigne(l.id,"qty",e.target.value.replace(/[^0-9.]/g,""))}
                  placeholder="1" style={{...S.inp({fontSize:13,textAlign:"center"}),width:"100%"}}/>
                <input type="number" min="0" value={l.prix} onChange={e=>updLigne(l.id,"prix",e.target.value)}
                  placeholder="0" style={{...S.inp({fontSize:13,textAlign:"right"}),width:"100%"}}/>
                {lignes.length>1
                  ?<button onClick={()=>remLigne(l.id)} style={{background:"none",border:"none",color:"#fca5a5",fontSize:18,cursor:"pointer",padding:0,lineHeight:1}}>×</button>
                  :<div/>}
              </div>
              {l.produit&&l.qty&&l.prix&&(
                <div style={{fontSize:10,color:"#1d4ed8",textAlign:"right",marginTop:2,paddingRight:30}}>
                  = {fmt((parseFloat(l.prix)||0)*(parseFloat(l.qty)||0),lang)}
                  {products.find(p=>p.name.toLowerCase()===l.produit.toLowerCase())&&` · stock +${l.qty}`}
                </div>
              )}
            </div>
          ))}

          <button onClick={addLigne}
            style={{width:"100%",padding:"8px",background:"#fff",border:"1.5px dashed #bfdbfe",borderRadius:8,fontSize:12,fontWeight:600,color:"#1d4ed8",cursor:"pointer",marginBottom:12,marginTop:4}}>
            + Ajouter un produit
          </button>

          {/* ملاحظة */}
          <input value={achatDesc} onChange={e=>setAchatDesc(e.target.value)}
            placeholder="Remarque (optionnel)" style={S.inp({marginBottom:10,fontSize:13})}/>

          {/* مدفوع أم لا */}
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            {[["Payé",true],["À payer",false]].map(([lb,v])=>(
              <button key={lb} onClick={()=>setAchatPaid(v)}
                style={{flex:1,padding:"8px",borderRadius:10,border:`1.5px solid ${achatPaid===v?"#2563EB":"#e5e7eb"}`,
                  background:achatPaid===v?"#eff6ff":"#fff",color:achatPaid===v?"#1d4ed8":"#6b7280",
                  fontSize:13,fontWeight:700,cursor:"pointer"}}>
                {lb}
              </button>
            ))}
          </div>

          {/* إجمالي + تسجيل */}
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {totalCalc>0&&<div style={{flex:1,fontWeight:900,fontSize:16,color:"#1d4ed8"}}>Total: {fmt(totalCalc,lang)}</div>}
            <button onClick={submitAchat} disabled={!canSubmit}
              style={{flex:canSubmit?2:1,padding:"12px",borderRadius:11,border:"none",fontSize:14,fontWeight:800,color:"#fff",
                background:canSubmit?"#2563EB":"#e5e7eb",cursor:canSubmit?"pointer":"default"}}>
              Enregistrer
            </button>
          </div>
        </div>
      )}

      {/* تاريخ المشتريات — قابل للضغط */}
      <div style={S.card()}>
        <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:12}}>📋 Historique des achats ({txs.length})</div>
        {txs.length===0?(
          <div style={{textAlign:"center",padding:"24px 0",color:"#9ca3af",fontSize:14}}>Aucun achat enregistré</div>
        ):[...txs].sort((a,b)=>new Date(b.date)-new Date(a.date)).map(tx=>{
          const hasDetail=tx.lignes&&tx.lignes.length>0;
          const isOpen=selectedTx?.id===tx.id;
          return(
          <div key={tx.id} style={{borderRadius:10,marginBottom:6,border:`1.5px solid ${!tx.paid?"#fde68a":isOpen?"#bfdbfe":"#f3f4f6"}`,background:!tx.paid?"#fffbeb":isOpen?"#eff6ff":"#fff",overflow:"hidden"}}>

            {/* صف رئيسي */}
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 12px"}}>
              <div style={{width:36,height:36,borderRadius:10,background:tx.paid?"#ecfdf5":"#fef2f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>
                {tx.paid?"✓":"⏳"}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:700,fontSize:13,color:"#111",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{tx.desc}</div>
                <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{tx.date}{hasDetail?` · ${tx.lignes.length} article(s)`:""}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontWeight:800,fontSize:15,color:"#dc2626"}}>–{fmt(tx.amount,lang)}</div>
                <div style={{fontSize:10,color:tx.paid?"#059669":"#d97706",fontWeight:700,marginTop:1}}>{tx.paid?"✓ Payé":"⏳ À payer"}</div>
              </div>
            </div>

            {/* أزرار الإجراء */}
            <div style={{display:"flex",gap:6,padding:"0 12px 10px"}}>
              {!tx.paid&&(
                <button onClick={()=>{setPayModal(tx);setPayAmt(String(tx.amount));}}
                  style={{flex:1,padding:"8px 0",background:"#059669",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                  💳 Enregistrer un paiement
                </button>
              )}
              <button onClick={()=>setSelectedTx(isOpen?null:tx)}
                style={{padding:"8px 14px",background:isOpen?"#1d4ed8":"#eff6ff",color:isOpen?"#fff":"#1d4ed8",border:"1px solid #bfdbfe",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                {isOpen?"▲ Masquer":"▼ Détails"}
              </button>
            </div>

            {/* تفاصيل عند الضغط */}
            {isOpen&&(
              <div style={{background:"#f8faff",borderTop:"1px solid #bfdbfe",padding:"12px 14px"}}>
                <div style={{fontSize:10,fontWeight:700,color:"#1d4ed8",marginBottom:8,textTransform:"uppercase",letterSpacing:.8}}>Détail de l'achat</div>
                {hasDetail?(
                  <>
                    {tx.lignes.map((l,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:i<tx.lignes.length-1?"1px solid #e0eaff":"none"}}>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <div style={{width:6,height:6,borderRadius:"50%",background:"#2563EB",flexShrink:0}}/>
                          <span style={{fontWeight:600,fontSize:13,color:"#111"}}>{l.produit}</span>
                          <span style={{fontSize:11,color:"#6b7280"}}>× {l.qty}</span>
                        </div>
                        <div style={{display:"flex",gap:12,alignItems:"center"}}>
                          {parseFloat(l.prix)>0&&<span style={{fontSize:12,color:"#6b7280"}}>{fmt(parseFloat(l.prix),lang)} / u.</span>}
                          <span style={{fontWeight:700,fontSize:13,color:"#1d4ed8"}}>{fmt((parseFloat(l.prix)||0)*(parseFloat(l.qty)||1),lang)}</span>
                        </div>
                      </div>
                    ))}
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:8,paddingTop:8,borderTop:"2px solid #bfdbfe"}}>
                      <span style={{fontWeight:700,fontSize:13,color:"#374151"}}>Total</span>
                      <span style={{fontWeight:900,fontSize:14,color:"#dc2626"}}>–{fmt(tx.amount,lang)}</span>
                    </div>
                  </>
                ):(
                  <div style={{padding:"8px 0"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:"#2563EB"}}/>
                        <span style={{fontWeight:600,fontSize:13,color:"#111"}}>{tx.desc||"Achat"}</span>
                      </div>
                      <span style={{fontWeight:900,fontSize:14,color:"#dc2626"}}>–{fmt(tx.amount,lang)}</span>
                    </div>
                    <div style={{fontSize:11,color:"#9ca3af",marginTop:4,paddingLeft:14}}>
                      {tx.date} · {tx.paid?"✓ Payé":"⏳ À payer"}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          );
        })}
      </div>

      {/* Modal دفع الدين */}
      {payModal&&(
        <div onClick={()=>setPayModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,backdropFilter:"blur(4px)",padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:340,boxShadow:"0 24px 64px rgba(0,0,0,.25)",animation:"up .2s cubic-bezier(.22,1,.36,1)"}}>
            <div style={{fontSize:28,textAlign:"center",marginBottom:8}}>💳</div>
            <div style={{fontWeight:900,fontSize:16,color:"#111",marginBottom:4,textAlign:"center"}}>Paiement fournisseur</div>
            <div style={{fontSize:13,color:"#6b7280",textAlign:"center",marginBottom:16}}>{payModal.desc}</div>

            <div style={{background:"#fef3c7",borderRadius:10,padding:"10px 14px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:12,color:"#92400e",fontWeight:600}}>Reste à payer</span>
              <span style={{fontWeight:900,fontSize:18,color:"#d97706"}}>{fmt(payModal.amount,lang)}</span>
            </div>

            <div style={{fontSize:11,fontWeight:700,color:"#374151",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Montant à payer maintenant</div>
            <input type="number" min="1" autoFocus
              value={payAmt} onChange={e=>setPayAmt(e.target.value.replace(/[^0-9.]/g,""))}
              style={S.inp({fontSize:22,fontWeight:800,marginBottom:8,textAlign:"center"})}/>

            {/* أزرار سريعة */}
            <div style={{display:"flex",gap:6,marginBottom:12}}>
              {[25,50,75,100].map(pct=>(
                <button key={pct} onClick={()=>setPayAmt(String(Math.round(payModal.amount*pct/100)))}
                  style={{flex:1,padding:"6px 0",background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:8,fontSize:12,fontWeight:700,color:"#374151",cursor:"pointer"}}>
                  {pct}%
                </button>
              ))}
            </div>

            {parseFloat(payAmt)>0&&parseFloat(payAmt)<payModal.amount&&(
              <div style={{fontSize:12,color:"#d97706",textAlign:"center",marginBottom:10,background:"#fffbeb",padding:"6px 10px",borderRadius:8}}>
                Reste après ce paiement : <strong>{fmt(payModal.amount-parseFloat(payAmt),lang)}</strong>
              </div>
            )}
            {parseFloat(payAmt)>=payModal.amount&&(
              <div style={{fontSize:12,color:"#059669",textAlign:"center",marginBottom:10,background:"#ecfdf5",padding:"6px 10px",borderRadius:8,fontWeight:700}}>
                ✓ Dette soldée complètement
              </div>
            )}

            <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:10,marginTop:4}}>
              <button onClick={()=>setPayModal(null)} style={{padding:13,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>Annuler</button>
              <button onClick={()=>{
                const amt=parseFloat(payAmt);
                if(!amt||amt<=0) return;
                onPayDette(payModal.id, Math.min(amt, payModal.amount));
                setPayModal(null); setPayAmt("");
              }}
                disabled={!payAmt||parseFloat(payAmt)<=0}
                style={{padding:13,borderRadius:12,border:"none",fontSize:14,fontWeight:800,color:"#fff",
                  background:payAmt&&parseFloat(payAmt)>0?"#059669":"#e5e7eb",cursor:"pointer"}}>
                💳 Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* تأكيد الحذف */}
      {confirmDel&&(
        <div onClick={()=>setConfirmDel(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,backdropFilter:"blur(4px)",padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:320,boxShadow:"0 24px 64px rgba(0,0,0,.25)",animation:"up .2s cubic-bezier(.22,1,.36,1)"}}>
            <div style={{fontSize:40,textAlign:"center",marginBottom:12}}>🗑</div>
            <div style={{fontWeight:900,fontSize:16,color:"#111",marginBottom:8,textAlign:"center"}}>Supprimer ce fournisseur ?</div>
            <div style={{background:"#f9fafb",borderRadius:12,padding:"10px 14px",marginBottom:20,textAlign:"center",fontWeight:700,fontSize:15}}>{fournisseur.name}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button onClick={()=>setConfirmDel(false)} style={{padding:13,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>Annuler</button>
              <button onClick={()=>{onDelete();setConfirmDel(false);}} style={{padding:13,borderRadius:12,border:"none",fontSize:14,fontWeight:800,color:"#fff",background:"#ef4444",cursor:"pointer"}}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ═══ HISTORY TAB COMPONENT ═══ */
function HistoryTab({txs,invoices,histFilter,setHistFilter,dateFrom,setDateFrom,dateTo,setDateTo,histSearch,setHistSearch,confirmDelTx,setConfirmDelTx,delTx,setPreviewInvoice,lang}){
  const filtered=[...txs].sort((a,b)=>new Date(b.date)-new Date(a.date)).filter(tx=>{
    if(histFilter==="income"&&tx.type!=="income") return false;
    if(histFilter==="expense"&&tx.type!=="expense") return false;
    if(dateFrom&&tx.date<dateFrom) return false;
    if(dateTo&&tx.date>dateTo) return false;
    if(histSearch&&!tx.desc?.toLowerCase().includes(histSearch.toLowerCase())&&!tx.client?.toLowerCase().includes(histSearch.toLowerCase())) return false;
    return true;
  });
  const totalIncome=filtered.filter(tx=>tx.type==="income"&&tx.paid).reduce((s,tx)=>s+tx.amount,0);
  const totalExpense=filtered.filter(tx=>tx.type==="expense").reduce((s,tx)=>s+tx.amount,0);
  const t=T[lang];
  const exportCSV=()=>{
    const rows=[["Date","Type","Description","Client","Montant","Statut","Facture"],...filtered.map(tx=>[tx.date,tx.type==="income"?"Revenu":"Dépense",tx.desc||"",tx.client||"",tx.amount,tx.paid?"Payé":"En attente",tx.invoiceId||""])];
    const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url; a.download=`historique_${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };
  return(
    <div>
      <div style={S.card({marginBottom:12})}>
        <div style={{position:"relative",marginBottom:12}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#9ca3af"}}>🔍</span>
          <input value={histSearch} onChange={e=>setHistSearch(e.target.value)} placeholder="Rechercher..." style={{...S.inp({paddingLeft:36})}}/>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
          {[["all","Tout"],["income","↑ Revenus"],["expense","↓ Dépenses"]].map(([k,l])=>(
            <button key={k} onClick={()=>setHistFilter(k)} style={{padding:"6px 14px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,background:histFilter===k?"#2563EB":"#f3f4f6",color:histFilter===k?"#fff":"#6b7280"}}>{l}</button>
          ))}
          <button onClick={exportCSV} style={{marginLeft:"auto",padding:"6px 14px",background:"#059669",color:"#fff",border:"none",borderRadius:20,fontSize:12,fontWeight:700,cursor:"pointer"}}>📊 Export CSV</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div><div style={{fontSize:10,color:"#9ca3af",marginBottom:4,fontWeight:600}}>Du</div><input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)} style={S.inp({fontSize:13})}/></div>
          <div><div style={{fontSize:10,color:"#9ca3af",marginBottom:4,fontWeight:600}}>Au</div><input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)} style={S.inp({fontSize:13})}/></div>
        </div>
        {(dateFrom||dateTo)&&<button onClick={()=>{setDateFrom("");setDateTo("");}} style={{marginTop:8,fontSize:11,color:"#6b7280",background:"none",border:"none",cursor:"pointer",padding:0}}>× Effacer les dates</button>}
      </div>
      {filtered.length>0&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
          <div style={{background:"#ecfdf5",borderRadius:10,padding:"10px",textAlign:"center"}}><div style={{fontWeight:900,fontSize:14,color:"#059669"}}>{fmt(totalIncome,lang)}</div><div style={{fontSize:9,color:"#065f46",fontWeight:700,marginTop:2}}>REVENUS</div></div>
          <div style={{background:"#fef2f2",borderRadius:10,padding:"10px",textAlign:"center"}}><div style={{fontWeight:900,fontSize:14,color:"#dc2626"}}>{fmt(totalExpense,lang)}</div><div style={{fontSize:9,color:"#b91c1c",fontWeight:700,marginTop:2}}>DÉPENSES</div></div>
          <div style={{background:"#eff6ff",borderRadius:10,padding:"10px",textAlign:"center"}}><div style={{fontWeight:900,fontSize:14,color:"#2563EB"}}>{filtered.length}</div><div style={{fontSize:9,color:"#1d4ed8",fontWeight:700,marginTop:2}}>ENTRÉES</div></div>
        </div>
      )}
      <div style={S.card()}>
        {filtered.length===0
          ?<div style={{textAlign:"center",padding:"40px 0",color:"#9ca3af",fontSize:14}}>Aucune entrée trouvée</div>
          :filtered.map(tx=>{
            const linkedInv=tx.invoiceId?invoices.find(i=>i.id===tx.invoiceId):null;
            return(
              <div key={tx.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:"1px solid #f9fafb"}}>
                <div style={{width:36,height:36,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:tx.type==="income"?"#ecfdf5":"#fef2f2",fontSize:16}}>{tx.type==="income"?"↑":"↓"}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:14,color:"#111",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{tx.desc}</div>
                  <div style={{fontSize:11,color:"#9ca3af"}}>{tx.client||tx.date}{tx.invoiceId?` · 📄${tx.invoiceId}`:""}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontWeight:700,fontSize:14,color:tx.type==="income"?"#059669":"#dc2626"}}>{tx.type==="income"?"+":"–"}{fmt(tx.amount,lang)}</div>
                  {!tx.paid&&tx.type==="income"&&<div style={{fontSize:10,color:"#d97706",fontWeight:700}}>EN ATTENTE</div>}
                </div>
                {linkedInv&&<button onClick={()=>setPreviewInvoice(linkedInv)} style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"6px 10px",fontSize:12,fontWeight:700,color:"#1d4ed8",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>🧾 PDF</button>}
                <button onClick={()=>setConfirmDelTx(tx)} style={{background:"none",border:"none",color:"#d1d5db",fontSize:18,cursor:"pointer",padding:4,flexShrink:0,lineHeight:1}}>×</button>
              </div>
            );
          })
        }
      </div>
      {confirmDelTx&&(
        <div onClick={()=>setConfirmDelTx(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,backdropFilter:"blur(4px)",padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:320,boxShadow:"0 24px 64px rgba(0,0,0,.25)",animation:"up .2s cubic-bezier(.22,1,.36,1)"}}>
            <div style={{fontSize:40,textAlign:"center",marginBottom:12}}>🗑</div>
            <div style={{fontWeight:900,fontSize:16,color:"#111",marginBottom:12,textAlign:"center"}}>Supprimer cette entrée ?</div>
            <div style={{background:"#f9fafb",borderRadius:12,padding:"12px 14px",marginBottom:20}}>
              <div style={{fontWeight:700,fontSize:14,color:"#111",marginBottom:4}}>{confirmDelTx.desc}</div>
              <div style={{fontSize:13,color:"#6b7280"}}>{confirmDelTx.client||confirmDelTx.date}</div>
              <div style={{fontWeight:800,fontSize:16,color:confirmDelTx.type==="income"?"#059669":"#dc2626",marginTop:6}}>{confirmDelTx.type==="income"?"+":"–"}{fmt(confirmDelTx.amount,lang)}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button onClick={()=>setConfirmDelTx(null)} style={{padding:13,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>Annuler</button>
              <button onClick={()=>{delTx(confirmDelTx.id);setConfirmDelTx(null);}} style={{padding:13,borderRadius:12,border:"none",fontSize:14,fontWeight:800,color:"#fff",background:"#ef4444",cursor:"pointer"}}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ RAPPORT TAB COMPONENT ═══ */
function RapportTab({txs,invoices,rapportMonth,setRapportMonth,rapportYear,setRapportYear,setPreviewInvoice,lang}){
  const [statFilter,setStatFilter]=useState(null); // null | "paid" | "unpaid" | "all"
  const months=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const mm=String(rapportMonth+1).padStart(2,"0");
  const prefix=`${rapportYear}-${mm}`;
  const mTxs=txs.filter(tx=>tx.date?.startsWith(prefix));
  const mInvs=invoices.filter(inv=>inv.date?.startsWith(prefix));
  const revenus=mTxs.filter(tx=>tx.type==="income"&&tx.paid).reduce((s,tx)=>s+tx.amount,0);
  const depenses=mTxs.filter(tx=>tx.type==="expense").reduce((s,tx)=>s+tx.amount,0);
  const benefice=revenus-depenses;
  const attente=mTxs.filter(tx=>tx.type==="income"&&!tx.paid).reduce((s,tx)=>s+tx.amount,0);
  const nbInv=mInvs.length;
  const nbPaid=mInvs.filter(i=>i.payStatus==="paid").length;
  const today30=new Date(); today30.setDate(today30.getDate()-30);
  const oldDebts=invoices.filter(inv=>inv.payStatus!=="paid"&&new Date(inv.date)<today30);
  const clientMap={};
  mInvs.forEach(inv=>{clientMap[inv.customer]=(clientMap[inv.customer]||0)+inv.total;});
  const topClients=Object.entries(clientMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const exportRapport=()=>{
    const rows=[[`Rapport ${months[rapportMonth]} ${rapportYear}`],[],["Indicateur","Montant"],["Revenus encaissés",revenus],["Dépenses",depenses],["Bénéfice net",benefice],["À encaisser",attente],[],["Factures émises",nbInv],["Factures payées",nbPaid],["Factures impayées",nbInv-nbPaid]];
    const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download=`rapport_${prefix}.csv`; a.click(); URL.revokeObjectURL(url);
  };
  return(
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <button onClick={()=>{if(rapportMonth===0){setRapportMonth(11);setRapportYear(y=>y-1);}else setRapportMonth(m=>m-1);}} style={{width:36,height:36,borderRadius:10,border:"1.5px solid #e5e7eb",background:"#fff",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
        <div style={{flex:1,textAlign:"center",fontWeight:900,fontSize:18,color:"#111"}}>{months[rapportMonth]} {rapportYear}</div>
        <button onClick={()=>{if(rapportMonth===11){setRapportMonth(0);setRapportYear(y=>y+1);}else setRapportMonth(m=>m+1);}} style={{width:36,height:36,borderRadius:10,border:"1.5px solid #e5e7eb",background:"#fff",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
        <button onClick={exportRapport} style={{padding:"8px 14px",background:"#059669",color:"#fff",border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer"}}>📊 Export</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        <div style={{background:"#ecfdf5",borderRadius:14,padding:20,border:"1px solid #a7f3d0"}}><div style={{fontSize:11,fontWeight:700,color:"#065f46",marginBottom:6}}>REVENUS ENCAISSÉS</div><div style={{fontSize:26,fontWeight:900,color:"#059669"}}>{fmt(revenus,lang)}</div></div>
        <div style={{background:"#fef2f2",borderRadius:14,padding:20,border:"1px solid #fecaca"}}><div style={{fontSize:11,fontWeight:700,color:"#b91c1c",marginBottom:6}}>DÉPENSES</div><div style={{fontSize:26,fontWeight:900,color:"#dc2626"}}>{fmt(depenses,lang)}</div></div>
        <div style={{background:benefice>=0?"#eff6ff":"#fff7ed",borderRadius:14,padding:20,border:`1px solid ${benefice>=0?"#bfdbfe":"#fed7aa"}`,gridColumn:"1/-1"}}><div style={{fontSize:11,fontWeight:700,color:benefice>=0?"#1d4ed8":"#c2410c",marginBottom:6}}>BÉNÉFICE NET</div><div style={{fontSize:32,fontWeight:900,color:benefice>=0?"#2563EB":"#ea580c"}}>{benefice>=0?"+":""}{fmt(benefice,lang)}</div></div>
      </div>
      <div style={S.card({marginBottom:16})}>
        <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:12}}>📊 Factures — {months[rapportMonth]}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
          {[
            {l:"Émises",v:nbInv,c:"#374151",bg:"#f9fafb",k:"all"},
            {l:"Payées",v:nbPaid,c:"#059669",bg:"#ecfdf5",k:"paid"},
            {l:"Impayées",v:nbInv-nbPaid,c:"#dc2626",bg:"#fef2f2",k:"unpaid"},
            {l:"À encaisser",v:fmt(attente,lang),c:"#d97706",bg:"#fffbeb",k:"attente"},
          ].map(s=>(
            <div key={s.l} onClick={()=>setStatFilter(statFilter===s.k?null:s.k)}
              style={{textAlign:"center",padding:"10px 6px",background:statFilter===s.k?s.c:s.bg,borderRadius:10,cursor:"pointer",border:`2px solid ${statFilter===s.k?s.c:"transparent"}`,transition:"all .15s"}}>
              <div style={{fontWeight:900,fontSize:16,color:statFilter===s.k?"#fff":s.c}}>{s.v}</div>
              <div style={{fontSize:9,color:statFilter===s.k?"rgba(255,255,255,.8)":"#6b7280",fontWeight:700,marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* قائمة الفواتير المفلترة */}
        {statFilter&&(()=>{
          const filtered=mInvs.filter(inv=>{
            if(statFilter==="paid") return inv.payStatus==="paid";
            if(statFilter==="unpaid") return inv.payStatus!=="paid";
            if(statFilter==="attente") return inv.payStatus!=="paid"&&(inv.total-(inv.paidAmount||0))>0;
            return true; // all
          });
          return filtered.length===0?(
            <div style={{textAlign:"center",padding:"20px 0",color:"#9ca3af",fontSize:13,marginTop:12}}>Aucune facture</div>
          ):(
            <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:6}}>
              <div style={{fontSize:10,fontWeight:700,color:"#6b7280",textTransform:"uppercase",letterSpacing:.8,marginBottom:2}}>
                {statFilter==="paid"?"Factures payées":statFilter==="unpaid"?"Factures impayées":statFilter==="attente"?"À encaisser":"Toutes les factures"} ({filtered.length})
              </div>
              {[...filtered].sort((a,b)=>new Date(b.date)-new Date(a.date)).map(inv=>{
                const reste=inv.total-(inv.paidAmount||0);
                const isPaid=inv.payStatus==="paid";
                return(
                  <div key={inv.id} onClick={()=>setPreviewInvoice(inv)}
                    style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"#fff",borderRadius:10,cursor:"pointer",border:"1px solid #e5e7eb",boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}
                    onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,.1)"}
                    onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.04)"}>
                    <div style={{width:32,height:32,borderRadius:8,background:isPaid?"#ecfdf5":"#fef2f2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>
                      {isPaid?"✓":"⏳"}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:13,color:"#111"}}>{inv.customer}</div>
                      <div style={{fontSize:11,color:"#9ca3af"}}>{inv.id} · {inv.date}</div>
                    </div>
                    <div style={{textAlign:"right",flexShrink:0}}>
                      <div style={{fontWeight:800,fontSize:14,color:isPaid?"#059669":"#dc2626"}}>
                        {isPaid?fmt(inv.total,lang):fmt(reste,lang)}
                      </div>
                      <div style={{fontSize:10,fontWeight:700,color:isPaid?"#059669":inv.payStatus==="partial"?"#d97706":"#dc2626"}}>
                        {isPaid?"Payé":inv.payStatus==="partial"?"Partiel":"Impayé"}
                      </div>
                    </div>
                    <div style={{color:"#d1d5db",fontSize:12}}>›</div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
      {oldDebts.length>0&&(
        <div style={{background:"#fef2f2",borderRadius:14,padding:16,border:"1.5px solid #fecaca",marginBottom:16}}>
          <div style={{fontWeight:800,fontSize:14,color:"#b91c1c",marginBottom:12}}>⏰ Factures impayées depuis +30 jours ({oldDebts.length})</div>
          {oldDebts.map(inv=>{
            const days=Math.floor((new Date()-new Date(inv.date))/(1000*60*60*24));
            const reste=inv.total-(inv.paidAmount||0);
            return(<div key={inv.id} onClick={()=>setPreviewInvoice(inv)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:"#fff",borderRadius:10,marginBottom:6,cursor:"pointer",border:"1px solid #fecaca"}}><div><div style={{fontWeight:700,fontSize:13,color:"#111"}}>{inv.customer}</div><div style={{fontSize:11,color:"#9ca3af"}}>{inv.id} · {days} jours</div></div><div style={{fontWeight:800,fontSize:14,color:"#dc2626"}}>{fmt(reste,lang)}</div></div>);
          })}
        </div>
      )}
      {topClients.length>0&&(
        <div style={S.card()}>
          <div style={{fontSize:12,fontWeight:700,color:"#374151",marginBottom:12}}>🏆 Top clients — {months[rapportMonth]}</div>
          {topClients.map(([name,total],i)=>(
            <div key={name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<topClients.length-1?"1px solid #f3f4f6":"none"}}>
              <div style={{width:24,height:24,borderRadius:8,background:["#fbbf24","#94a3b8","#c2853a","#6366f1","#10b981"][i],display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#fff",flexShrink:0}}>{i+1}</div>
              <div style={{flex:1,fontWeight:600,fontSize:13,color:"#111"}}>{name}</div>
              <div style={{fontWeight:800,fontSize:13,color:"#059669"}}>{fmt(total,lang)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default function App(){
  const [lang,setLang]=useState("fr");
  const [user,setUser]=useState(null);
  const [txs,setTxs]=useState([]);
  const [started,setStarted]=useState(false);
  const [modal,setModal]=useState(null);
  const [tab,setTab]=useState("home");
  const [products,setProducts]=useState([]);
  const [invoices,setInvoices]=useState([]);
  const [customers,setCustomers]=useState([]);
  const [fournisseurs,setFournisseurs]=useState([]);
  const [toast,setToast]=useState(null);
  const [previewInvoice,setPreviewInvoice]=useState(null);
  const [selectedCustomer,setSelectedCustomer]=useState(null);
  const [editingCustomer,setEditingCustomer]=useState(null);
  const [invoicePreselect,setInvoicePreselect]=useState(null);
  const [companyName,setCompanyName]=useState("");
  const [bizSettings,setBizSettings]=useState({nif:"",tvaEnabled:false,tvaRate:19,timbreEnabled:false,invPrefix:"FAC",invCounter:1,blCounter:1,bcCounter:1});
  const [confirmTx,setConfirmTx]=useState(null);
  const [detailTx,setDetailTx]=useState(null);
  const [pendingRef,setPendingRef]=useState(null);
  const [showRefPanel,setShowRefPanel]=useState(false);
  const [confirmDelInvoice,setConfirmDelInvoice]=useState(null);
  const [invoiceSearch,setInvoiceSearch]=useState("");
  const [invoiceStatusFilter,setInvoiceStatusFilter]=useState("all"); // all|paid|unpaid|partial
  const [invoiceDateFrom,setInvoiceDateFrom]=useState("");
  const [invoiceDateTo,setInvoiceDateTo]=useState("");
  const [confirmLogout,setConfirmLogout]=useState(false);
  const [confirmDelTx,setConfirmDelTx]=useState(null);
  const [duplicateInv,setDuplicateInv]=useState(null);
  // History filters
  const [histFilter,setHistFilter]=useState("all");
  const [dateFrom,setDateFrom]=useState("");
  const [dateTo,setDateTo]=useState("");
  const [histSearch,setHistSearch]=useState("");
  // Rapport
  const [rapportMonth,setRapportMonth]=useState(new Date().getMonth());
  const [rapportYear,setRapportYear]=useState(new Date().getFullYear());

  const t=T[lang],rtl=lang==="ar";
  const effectiveCompanyName=companyName||(user?.shopName)||t.companyName;

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),2800);};

  // ── دخول: تحميل بيانات المستخدم ──
  const handleLogin=async(userInfo,data)=>{
    setUser(userInfo);
    setTxs(data.txs||[]);
    setProducts(data.products||[]);
    setInvoices(data.invoices||[]);
    setCustomers(data.customers||[]);
    setFournisseurs(data.fournisseurs||[]);
    setCompanyName(data.companyName||userInfo.shopName||"");
    setBizSettings(data.bizSettings||{nif:"",tvaEnabled:false,tvaRate:19,timbreEnabled:false,invPrefix:"FAC",invCounter:1,blCounter:1,bcCounter:1});
    setStarted((data.txs||[]).length>0||(data.invoices||[]).length>0);
    // فحص الإحالات الجديدة
    try{
      const refs=await getReferrals();
      const newRef=refs.find(r=>r.referrer===userInfo.username&&!r.seenByReferrer);
      if(newRef) setPendingRef(newRef);
    }catch{}
  };

  // ── خروج: حفظ أولاً ──
  const handleLogout=async()=>{
    if(user) await saveUserData(user.username,{txs,products,invoices,customers,companyName:effectiveCompanyName});
    setUser(null);setTxs([]);setProducts([]);setInvoices([]);setCustomers([]);
    setCompanyName("");setStarted(false);setTab("home");setSelectedCustomer(null);
  };

  // ── حفظ تلقائي (debounced 1.5s) ──
  const persistTimer=useRef({t:null});
  const persist=(patch={})=>{
    if(!user) return;
    clearTimeout(persistTimer.current.t);
    persistTimer.current.t=setTimeout(()=>{
      saveUserData(user.username,{
        txs:patch.txs??txs, products:patch.products??products,
        invoices:patch.invoices??invoices, customers:patch.customers??customers,
        fournisseurs:patch.fournisseurs??fournisseurs,
        companyName:patch.companyName??effectiveCompanyName,
        bizSettings:patch.bizSettings??bizSettings,
      });
    },1500);
  };

  const totalInc=txs.filter(x=>x.type==="income"&&x.paid).reduce((s,x)=>s+x.amount,0);
  const totalExp=txs.filter(x=>x.type==="expense").reduce((s,x)=>s+x.amount,0);
  const net=totalInc-totalExp;
  const owing=txs.filter(x=>x.type==="income"&&!x.paid).reduce((s,x)=>s+x.amount,0);
  const unpaidList=txs.filter(x=>x.type==="income"&&!x.paid).sort((a,b)=>new Date(b.date)-new Date(a.date));
  const n=unpaidList.length;

  const addTxMany=newTxs=>{const t2=[...newTxs,...txs];setTxs(t2);persist({txs:t2});};
  const markPaid=id=>{const t2=txs.map(x=>x.id===id?{...x,paid:true}:x);setTxs(t2);persist({txs:t2});};
  const delTx=id=>{const t2=txs.filter(x=>x.id!==id);setTxs(t2);persist({txs:t2});};

  const handleAddPayment=(newTx,invoiceId)=>{
    setTxs(prev=>{
      const unpaidTx=prev.find(x=>x.invoiceId===invoiceId&&!x.paid&&x.type==="income");
      let updated=prev;
      if(unpaidTx){
        const reste=unpaidTx.amount-newTx.amount;
        updated=reste<=0?prev.filter(x=>x.id!==unpaidTx.id):prev.map(x=>x.id===unpaidTx.id?{...x,amount:reste}:x);
      }
      const t2=[newTx,...updated]; persist({txs:t2}); return t2;
    });
    showToast(t.paymentSaved);
  };

  const saveProduct=p=>{const p2=products.findIndex(x=>x.id===p.id)>=0?products.map(x=>x.id===p.id?p:x):[p,...products];setProducts(p2);persist({products:p2});};
  const delProduct=id=>{const p2=products.filter(x=>x.id!==id);setProducts(p2);persist({products:p2});};
  const delInvoice=id=>{
    const inv2=invoices.filter(x=>x.id!==id);
    const tx2=txs.filter(x=>x.invoiceId!==id);
    setInvoices(inv2); setTxs(tx2);
    persist({invoices:inv2,txs:tx2});
    showToast("Facture supprimée ✓");
  };

  const saveCustomer=c=>{const c2=customers.findIndex(x=>x.id===c.id)>=0?customers.map(x=>x.id===c.id?c:x):[c,...customers];setCustomers(c2);persist({customers:c2});};
  const delCustomer=id=>{const c2=customers.filter(x=>x.id!==id);setCustomers(c2);persist({customers:c2});setSelectedCustomer(null);};

  const handleOnboard=choice=>{
    setStarted(true);
    if(choice==="demo"){
      const d={txs:DEMO_TXS,products:DEMO_PRODUCTS,customers:DEMO_CUSTOMERS_RAW,invoices:DEMO_INVOICES,companyName:effectiveCompanyName};
      setTxs(d.txs);setProducts(d.products);setCustomers(d.customers);setInvoices(d.invoices);
      persist(d);
    } else setModal(choice);
  };

  const handleInvoiceCreated=(invoice,newTxs)=>{
    const inv2=[invoice,...invoices]; setInvoices(inv2);
    let tx2=txs; if(newTxs.length){tx2=[...newTxs,...txs];setTxs(tx2);}
    let cust2=customers;
    if(!customers.find(c=>c.name===invoice.customer)){
      cust2=[{id:uid(),name:invoice.customer,phone:""},...customers]; setCustomers(cust2);
    }
    let prod2=products;
    invoice.lines.forEach(line=>{
      const p=products.find(x=>x.name===line.name&&x.stock!=null);
      if(p){
        const newStock=Math.max(0,p.stock-(parseFloat(line.qty)||1));
        prod2=prod2.map(x=>x.id===p.id?{...x,stock:newStock}:x);
      }
    });
    if(prod2!==products) setProducts(prod2);
    // زيادة العداد التسلسلي
    const newCounter=(bizSettings.invCounter||1)+1;
    const newBiz={...bizSettings,invCounter:newCounter};
    setBizSettings(newBiz);
    persist({invoices:inv2,txs:tx2,customers:cust2,products:prod2,bizSettings:newBiz});
    setModal(null); showToast(t.invoiceCreated);
  };

  if(!user) return <Auth onLogin={handleLogin} lang={lang} setLang={setLang}/>;
  if(!started) return <Onboard onChoice={handleOnboard} lang={lang}/>;

  const insightText=n>0?t.insight_unpaid(n):t.insight_up;
  const insightStyle=n>0?{bg:"#fffbeb",dot:"#f59e0b",text:"#92400e"}:{bg:"#ecfdf5",dot:"#10B981",text:"#065f46"};

  return(
    <div dir={rtl?"rtl":"ltr"} style={{minHeight:"100svh",background:"#f1f5f9",fontFamily:"system-ui,-apple-system,sans-serif",display:"flex"}}>

      {/* TOAST */}
      {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:"#111",color:"#fff",padding:"10px 20px",borderRadius:20,fontSize:14,fontWeight:600,zIndex:300,boxShadow:"0 8px 24px rgba(0,0,0,.3)",animation:"fadeIn .2s",whiteSpace:"nowrap"}}>{toast}</div>}

      {/* SIDEBAR */}
      <div style={{width:220,background:"#fff",borderRight:"1px solid #e5e7eb",display:"flex",flexDirection:"column",position:"fixed",top:0,left:rtl?"auto":"0",right:rtl?"0":"auto",height:"100vh",zIndex:20}}>
        <div style={{padding:"20px 16px 14px",borderBottom:"1px solid #f3f4f6"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
            <span style={{fontSize:22}}>💼</span>
            <span style={{fontWeight:900,fontSize:17,color:"#2563EB"}}>{t.appName}</span>
          </div>
          <div style={{fontSize:11,color:"#9ca3af"}}>{effectiveCompanyName} · @{user?.username}</div>
        </div>
        <div style={{flex:1,padding:"10px 10px",display:"flex",flexDirection:"column",gap:2}}>
          {[["home","🏠",t.home],["invoices","🧾",t.invoices],["customers","👥",t.customers],["fournisseurs","🏭","Fournisseurs"],["history","📋",t.history],["rapport","📈","Rapport"]].map(([k,icon,label])=>(
            <button key={k} onClick={()=>{setTab(k);setSelectedCustomer(null);}}
              style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,border:"none",cursor:"pointer",fontSize:14,fontWeight:tab===k?700:400,background:tab===k?"#eff6ff":"transparent",color:tab===k?"#2563EB":"#6b7280",textAlign:"left",width:"100%"}}>
              <span>{icon}</span>{label}
            </button>
          ))}
          <div style={{height:1,background:"#f3f4f6",margin:"8px 0"}}/>
          <button onClick={()=>setModal("invoice")} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 12px",borderRadius:10,border:"none",cursor:"pointer",fontSize:14,fontWeight:700,background:"#2563EB",color:"#fff",width:"100%",boxShadow:"0 4px 12px rgba(37,99,235,.3)"}}>
            🧾 {t.newInvoice}
          </button>
          <button onClick={()=>setModal("expense")} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,border:"none",cursor:"pointer",fontSize:14,fontWeight:600,background:"#fef2f2",color:"#dc2626",width:"100%"}}>
            – {t.addExpense}
          </button>
          <button onClick={()=>setModal("income")} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,border:"none",cursor:"pointer",fontSize:14,fontWeight:600,background:"#ecfdf5",color:"#059669",width:"100%"}}>
            + {t.addIncome}
          </button>
        </div>
        <div style={{padding:"10px",borderTop:"1px solid #f3f4f6",display:"flex",flexDirection:"column",gap:2}}>
          <button onClick={()=>setShowRefPanel(true)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,border:"none",cursor:"pointer",fontSize:13,background:"transparent",color:"#059669",width:"100%",fontWeight:700}}>💰 Gagnez 1 000 DA</button>
          <button onClick={()=>setModal("products")} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,border:"none",cursor:"pointer",fontSize:13,background:"transparent",color:"#6b7280",width:"100%"}}>📦 {t.manageProducts}</button>
          <button onClick={()=>setModal("settings")} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,border:"none",cursor:"pointer",fontSize:13,background:"transparent",color:"#6b7280",width:"100%"}}>⚙️ {t.settings}</button>
          <button onClick={()=>setLang(l=>l==="fr"?"ar":"fr")} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,border:"none",cursor:"pointer",fontSize:13,background:"transparent",color:"#6b7280",width:"100%"}}>🌐 {lang==="fr"?"AR":"FR"}</button>
          <button onClick={()=>setConfirmLogout(true)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,border:"none",cursor:"pointer",fontSize:13,background:"transparent",color:"#ef4444",width:"100%"}}>← Déconnexion</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,marginLeft:rtl?0:220,marginRight:rtl?220:0,display:"flex",flexDirection:"column",minHeight:"100vh"}}>

      {/* CONTENT */}
      <div style={{flex:1,padding:"28px 32px",paddingBottom:40,overflowY:"auto",maxWidth:900,width:"100%",margin:"0 auto",boxSizing:"border-box"}}>

        {/* Page title */}
        <div style={{marginBottom:24,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontWeight:900,fontSize:20,color:"#111"}}>
            {tab==="home"&&t.home} {tab==="invoices"&&t.invoices} {tab==="customers"&&t.customers} {tab==="history"&&t.history}
          </div>
        </div>

        {/* ── HOME ── */}
        {tab==="home"&&(<>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:insightStyle.bg,borderRadius:12,marginBottom:16}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:insightStyle.dot,flexShrink:0}}/>
            <span style={{fontSize:13,fontWeight:600,color:insightStyle.text}}>{insightText}</span>
          </div>

          {/* تحذير المخزون */}
          {(()=>{
            const out=products.filter(p=>p.stock===0);
            const low=products.filter(p=>p.stock!=null&&p.stock>0&&p.stock<=(p.alertThreshold??5));
            return(out.length>0||low.length>0)&&(
              <div style={{marginBottom:16,display:"flex",flexDirection:"column",gap:6}}>
                {out.length>0&&<div style={{background:"#fef2f2",borderRadius:12,padding:"10px 14px",border:"1px solid #fecaca",display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>setModal("products")}>
                  <span>🚨</span>
                  <div style={{flex:1}}><span style={{fontWeight:700,fontSize:13,color:"#b91c1c"}}>Rupture: </span><span style={{fontSize:13,color:"#dc2626"}}>{out.map(p=>p.name).join(", ")}</span></div>
                  <span style={{fontSize:12,color:"#9ca3af"}}>Gérer →</span>
                </div>}
                {low.length>0&&<div style={{background:"#fffbeb",borderRadius:12,padding:"10px 14px",border:"1px solid #fde68a",display:"flex",alignItems:"center",gap:8,cursor:"pointer"}} onClick={()=>setModal("products")}>
                  <span>⚠️</span>
                  <div style={{flex:1}}><span style={{fontWeight:700,fontSize:13,color:"#92400e"}}>Stock faible: </span><span style={{fontSize:13,color:"#d97706"}}>{low.map(p=>`${p.name} (${p.stock})`).join(", ")}</span></div>
                  <span style={{fontSize:12,color:"#9ca3af"}}>Gérer →</span>
                </div>}
              </div>
            );
          })()}
          <div style={{background:net>=0?"linear-gradient(135deg,#059669,#10B981)":"linear-gradient(135deg,#b91c1c,#ef4444)",borderRadius:20,padding:"28px 24px",marginBottom:16,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",right:-20,top:-20,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,.08)"}}/>
            <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.75)",marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>{t.profit}</div>
            <div style={{fontSize:44,fontWeight:900,color:"#fff",letterSpacing:"-2px",lineHeight:1}}>{net>=0?"+":""}{fmt(net,lang)}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
            {[{l:t.income,v:totalInc,bg:"#ecfdf5",c:"#059669"},{l:t.expenses,v:totalExp,bg:"#fef2f2",c:"#dc2626"},{l:t.owed,v:owing,bg:"#fffbeb",c:"#d97706"}].map(s=>(
              <div key={s.l} style={{background:s.bg,borderRadius:14,padding:"12px 8px",textAlign:"center"}}>
                <div style={{fontSize:9,fontWeight:700,color:s.c,opacity:.7,marginBottom:4,textTransform:"uppercase",letterSpacing:.5}}>{s.l}</div>
                <div style={{fontSize:13,fontWeight:800,color:s.c}}>{fmt(s.v,lang)}</div>
              </div>
            ))}
          </div>
          <div style={{...S.card({marginBottom:16})}}>
            <Bars txs={txs}/>
          </div>
          <div style={S.card()}>
            <div style={{fontWeight:700,fontSize:14,color:"#111",marginBottom:8}}>💸 {t.unpaid}</div>
            {unpaidList.length===0
              ?<div style={{fontSize:14,color:"#9ca3af",padding:"16px 0",textAlign:"center"}}>{t.noUnpaid}</div>
              :unpaidList.map(tx=>(
                <div key={tx.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 0",borderBottom:"1px solid #f9fafb",gap:8}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:14,color:"#111",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{tx.client||tx.desc}</div>
                    <div style={{fontSize:11,color:"#9ca3af"}}>{tx.invoiceId?`📄 ${tx.invoiceId}`:tx.date}</div>
                  </div>
                  <span style={{fontWeight:700,color:"#d97706",fontSize:14,flexShrink:0}}>{fmt(tx.amount,lang)}</span>
                  <div style={{display:"flex",gap:6,flexShrink:0}}>
                    {/* Bouton Détail — visible seulement si facture liée */}
                    {tx.invoiceId&&(()=>{
                      const inv=invoices.find(i=>i.id===tx.invoiceId);
                      return inv?(
                        <button onClick={()=>setDetailTx(inv)}
                          style={{padding:"6px 10px",background:"#eff6ff",color:"#1d4ed8",border:"1px solid #bfdbfe",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                          {t.detail}
                        </button>
                      ):null;
                    })()}
                    {/* Bouton Encaissé → ouvre confirmation */}
                    <button onClick={()=>setConfirmTx(tx)}
                      style={{padding:"6px 10px",background:"#ecfdf5",color:"#065f46",border:"1px solid #a7f3d0",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                      {t.markPaid}
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </>)}

        {/* ── INVOICES ── */}
        {tab==="invoices"&&(()=>{
          const filtered=invoices.filter(inv=>{
            const q=invoiceSearch.toLowerCase();
            if(q&&!inv.customer?.toLowerCase().includes(q)&&!inv.id?.toLowerCase().includes(q)) return false;
            if(invoiceStatusFilter!=="all"&&inv.payStatus!==invoiceStatusFilter) return false;
            if(invoiceDateFrom&&inv.date<invoiceDateFrom) return false;
            if(invoiceDateTo&&inv.date>invoiceDateTo) return false;
            return true;
          }).sort((a,b)=>new Date(b.date)-new Date(a.date));

          const sc={paid:"#059669",unpaid:"#dc2626",partial:"#d97706"};
          const sb={paid:"#ecfdf5",unpaid:"#fef2f2",partial:"#fffbeb"};
          const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

          const printList=()=>{
            const months=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
            const now=new Date();
            const periodLabel=invoiceDateFrom||invoiceDateTo
              ?`${invoiceDateFrom||"…"} → ${invoiceDateTo||"…"}`
              :`${months[now.getMonth()]} ${now.getFullYear()}`;
            const totalAll=filtered.reduce((s,i)=>s+i.total,0);
            const totalPaid=filtered.filter(i=>i.payStatus==="paid").reduce((s,i)=>s+i.total,0);
            const totalUnpaid=filtered.filter(i=>i.payStatus!=="paid").reduce((s,i)=>s+(i.total-(i.paidAmount||0)),0);
            const rows=filtered.map((inv,i)=>`
              <tr style="background:${i%2===0?"#fff":"#f8fafc"}">
                <td style="padding:8px 10px;font-size:12px;font-family:monospace;color:#2563EB">${inv.id}</td>
                <td style="padding:8px 10px;font-size:12px;font-weight:600">${inv.customer}</td>
                <td style="padding:8px 10px;font-size:12px;color:#64748b">${inv.date}</td>
                <td style="padding:8px 10px;font-size:12px;text-align:right;font-weight:700">${inv.total.toLocaleString()} DA</td>
                <td style="padding:8px 10px;font-size:11px;text-align:center">
                  <span style="padding:3px 10px;border-radius:20px;font-weight:700;background:${sb[inv.payStatus]};color:${sc[inv.payStatus]}">
                    ${inv.payStatus==="paid"?"Payé":inv.payStatus==="partial"?"Partiel":"Impayé"}
                  </span>
                </td>
                <td style="padding:8px 10px;font-size:12px;text-align:right;color:${inv.payStatus==="paid"?"#059669":"#dc2626"};font-weight:700">
                  ${inv.payStatus==="paid"?"—":(inv.total-(inv.paidAmount||0)).toLocaleString()+" DA"}
                </td>
              </tr>`).join("");
            const html=`<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Liste Factures</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',system-ui,sans-serif;padding:32px;color:#1e293b}
  .page{max-width:900px;margin:0 auto}
  .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;padding-bottom:16px;border-bottom:3px solid #1e293b}
  table{width:100%;border-collapse:collapse;margin-bottom:20px}
  thead tr{background:#1e293b;color:#fff}
  th{padding:10px 10px;font-size:10px;text-transform:uppercase;letter-spacing:.8px;text-align:left;font-weight:700}
  th:nth-child(4),th:nth-child(6){text-align:right}
  th:nth-child(5){text-align:center}
  .summary{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px}
  .sum-box{padding:14px;border-radius:8px;border:1px solid #e2e8f0}
  .sum-label{font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
  .sum-value{font-size:20px;font-weight:900}
  @media print{body{padding:20px}}
</style>
<script>window.onload=function(){window.print();}<\/script>
</head><body><div class="page">
<div class="header">
  <div>
    <div style="font-size:20px;font-weight:900">${effectiveCompanyName||"Fawtara"}</div>
    <div style="font-size:13px;color:#64748b;margin-top:4px">Liste des factures — ${periodLabel}</div>
    ${invoiceStatusFilter!=="all"?`<div style="font-size:12px;color:#2563EB;margin-top:2px">Filtre: ${invoiceStatusFilter==="paid"?"Payées":invoiceStatusFilter==="unpaid"?"Impayées":"Partielles"}</div>`:""}
  </div>
  <div style="text-align:right;font-size:12px;color:#64748b">
    <div>${filtered.length} facture(s)</div>
    <div style="margin-top:4px">${new Date().toLocaleDateString("fr-DZ")}</div>
  </div>
</div>
<div class="summary">
  <div class="sum-box" style="background:#eff6ff"><div class="sum-label">Total facturé</div><div class="sum-value" style="color:#2563EB">${totalAll.toLocaleString()} DA</div></div>
  <div class="sum-box" style="background:#ecfdf5"><div class="sum-label">Total encaissé</div><div class="sum-value" style="color:#059669">${totalPaid.toLocaleString()} DA</div></div>
  <div class="sum-box" style="background:#fef2f2"><div class="sum-label">Reste à encaisser</div><div class="sum-value" style="color:#dc2626">${totalUnpaid.toLocaleString()} DA</div></div>
</div>
<table>
  <thead><tr>
    <th>N° Facture</th><th>Client</th><th>Date</th>
    <th style="text-align:right">Montant</th><th style="text-align:center">Statut</th>
    <th style="text-align:right">Reste</th>
  </tr></thead>
  <tbody>${rows}</tbody>
</table>
<div style="text-align:center;font-size:10px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:12px">Document généré par Fawtara · ${new Date().toLocaleDateString("fr-DZ")}</div>
</div></body></html>`;
            const blob=new Blob([html],{type:"text/html"});
            const url=URL.createObjectURL(blob);
            window.open(url,"_blank");
            setTimeout(()=>URL.revokeObjectURL(url),10000);
          };

          return(
          <div>
            {/* فلاتر */}
            <div style={S.card({marginBottom:12})}>
              {/* بحث */}
              <div style={{position:"relative",marginBottom:10}}>
                <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#9ca3af"}}>🔍</span>
                <input value={invoiceSearch} onChange={e=>setInvoiceSearch(e.target.value)}
                  placeholder="Client ou N° facture..."
                  style={{...S.inp({paddingLeft:36})}}/>
                {invoiceSearch&&<button onClick={()=>setInvoiceSearch("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:"#9ca3af"}}>×</button>}
              </div>
              {/* فلتر الحالة */}
              <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
                {[["all","Tout"],["paid","✓ Payées"],["partial","⏳ Partielles"],["unpaid","✗ Impayées"]].map(([k,l])=>(
                  <button key={k} onClick={()=>setInvoiceStatusFilter(k)}
                    style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,
                      background:invoiceStatusFilter===k?"#2563EB":"#f3f4f6",color:invoiceStatusFilter===k?"#fff":"#6b7280"}}>
                    {l}
                  </button>
                ))}
                <button onClick={printList}
                  style={{marginLeft:"auto",padding:"6px 14px",background:"#6366f1",color:"#fff",border:"none",borderRadius:20,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  🖨 Imprimer liste
                </button>
              </div>
              {/* فلتر التاريخ */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <div><div style={{fontSize:10,color:"#9ca3af",marginBottom:4,fontWeight:600}}>Du</div><input type="date" value={invoiceDateFrom} onChange={e=>setInvoiceDateFrom(e.target.value)} style={S.inp({fontSize:13})}/></div>
                <div><div style={{fontSize:10,color:"#9ca3af",marginBottom:4,fontWeight:600}}>Au</div><input type="date" value={invoiceDateTo} onChange={e=>setInvoiceDateTo(e.target.value)} style={S.inp({fontSize:13})}/></div>
              </div>
              {(invoiceDateFrom||invoiceDateTo||invoiceStatusFilter!=="all")&&(
                <button onClick={()=>{setInvoiceDateFrom("");setInvoiceDateTo("");setInvoiceStatusFilter("all");}}
                  style={{marginTop:8,fontSize:11,color:"#6b7280",background:"none",border:"none",cursor:"pointer",padding:0}}>
                  × Effacer les filtres
                </button>
              )}
            </div>

            {/* إحصائيات سريعة */}
            {filtered.length>0&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                <div style={{background:"#eff6ff",borderRadius:10,padding:"10px",textAlign:"center"}}>
                  <div style={{fontWeight:900,fontSize:15,color:"#2563EB"}}>{filtered.length}</div>
                  <div style={{fontSize:9,color:"#1d4ed8",fontWeight:700,marginTop:2}}>FACTURES</div>
                </div>
                <div style={{background:"#ecfdf5",borderRadius:10,padding:"10px",textAlign:"center"}}>
                  <div style={{fontWeight:900,fontSize:13,color:"#059669"}}>{fmt(filtered.reduce((s,i)=>s+i.total,0),lang)}</div>
                  <div style={{fontSize:9,color:"#065f46",fontWeight:700,marginTop:2}}>TOTAL</div>
                </div>
                <div style={{background:"#fef2f2",borderRadius:10,padding:"10px",textAlign:"center"}}>
                  <div style={{fontWeight:900,fontSize:13,color:"#dc2626"}}>{fmt(filtered.filter(i=>i.payStatus!=="paid").reduce((s,i)=>s+(i.total-(i.paidAmount||0)),0),lang)}</div>
                  <div style={{fontSize:9,color:"#b91c1c",fontWeight:700,marginTop:2}}>RESTE</div>
                </div>
              </div>
            )}

            {/* قائمة الفواتير */}
            {invoices.length===0?(
              <div style={{textAlign:"center",padding:"60px 20px"}}>
                <div style={{fontSize:48,marginBottom:12}}>🧾</div>
                <div style={{fontWeight:700,fontSize:16,color:"#374151",marginBottom:8}}>{t.noInvoices}</div>
                <button onClick={()=>setModal("invoice")} style={{padding:"12px 24px",background:"#2563EB",color:"#fff",border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer"}}>+ {t.newInvoice}</button>
              </div>
            ):filtered.length===0?(
              <div style={{textAlign:"center",padding:"40px 0",color:"#9ca3af",fontSize:14}}>Aucun résultat</div>
            ):filtered.map(inv=>(
              <div key={inv.id} style={{...S.card({marginBottom:10,display:"flex",alignItems:"center",gap:12})}}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,.1)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.06)"}>
                <div onClick={()=>setPreviewInvoice(inv)} style={{width:40,height:40,background:"#eff6ff",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18,cursor:"pointer"}}>🧾</div>
                <div onClick={()=>setPreviewInvoice(inv)} style={{flex:1,minWidth:0,cursor:"pointer"}}>
                  <div style={{fontWeight:700,fontSize:14,color:"#111"}}>{inv.customer}</div>
                  <div style={{fontSize:11,color:"#9ca3af"}}>{inv.id} · {inv.date}</div>
                </div>
                <div onClick={()=>setPreviewInvoice(inv)} style={{textAlign:"right",flexShrink:0,cursor:"pointer"}}>
                  <div style={{fontWeight:800,fontSize:15,color:"#111",marginBottom:4}}>{fmt(inv.total,lang)}</div>
                  <span style={S.pill(sb[inv.payStatus],sc[inv.payStatus])}>● {t["status"+cap(inv.payStatus)]}</span>
                </div>
                <button onClick={e=>{e.stopPropagation();setDuplicateInv(inv);setModal("invoice");}}
                  title="Dupliquer"
                  style={{background:"#f0fdf4",border:"none",padding:"6px 10px",borderRadius:8,fontSize:14,cursor:"pointer",color:"#059669",flexShrink:0}}>⧉</button>
                <button onClick={e=>{e.stopPropagation();setConfirmDelInvoice(inv);}}
                  style={{background:"#fef2f2",border:"none",padding:"6px 10px",borderRadius:8,fontSize:14,cursor:"pointer",color:"#dc2626",flexShrink:0}}>×</button>
              </div>
            ))}
          </div>
          );
        })()}

        {/* ── CUSTOMERS ── */}
        {tab==="customers"&&(
          selectedCustomer?(
            <CustomerDetail
              customer={selectedCustomer}
              invoices={invoices}
              txs={txs}
              products={products}
              lang={lang}
              onBack={()=>setSelectedCustomer(null)}
              onEdit={c=>{setEditingCustomer(c);}}
              onDelete={id=>{delCustomer(id);showToast(t.deleteCustomer+" ✓");}}
              onNewInvoice={name=>{setInvoicePreselect(name);setModal("invoice");}}
              onOpenInvoice={inv=>setPreviewInvoice(inv)}
            />
          ):(
            <CustomersTab
              customers={customers}
              invoices={invoices}
              txs={txs}
              products={products}
              lang={lang}
              onSelectCustomer={c=>setSelectedCustomer(c)}
              onNewCustomer={()=>setModal("newCustomer")}
              onNewInvoice={name=>{setInvoicePreselect(name);setModal("invoice");}}
            />
          )
        )}

        {/* ── FOURNISSEURS ── */}
        {tab==="fournisseurs"&&(
          <FournisseursTab
            fournisseurs={fournisseurs}
            txs={txs}
            products={products}
            lang={lang}
            onSave={f=>{
              const f2=fournisseurs.findIndex(x=>x.id===f.id)>=0?fournisseurs.map(x=>x.id===f.id?f:x):[f,...fournisseurs];
              setFournisseurs(f2);persist({fournisseurs:f2});
            }}
            onDelete={id=>{const f2=fournisseurs.filter(x=>x.id!==id);setFournisseurs(f2);persist({fournisseurs:f2});}}
            onAddTx={tx=>{const t2=[tx,...txs];setTxs(t2);persist({txs:t2});showToast("Achat enregistré ✓");}}
            onUpdateStock={(prodId,qty)=>{
              const p2=products.map(p=>p.id===prodId?{...p,stock:(p.stock||0)+qty}:p);
              setProducts(p2);persist({products:p2});
            }}
            onPayDette={(txId,montant,fournisseurId)=>{
              const t2=txs.map(tx=>{
                if(tx.id!==txId) return tx;
                const reste=Math.max(0, tx.amount - montant);
                if(reste<=0) return {...tx, paid:true, paidAmount:tx.amount};
                // دفع جزئي — ينقص المبلغ المتبقي
                return {...tx, amount:reste, paidAmount:(tx.paidAmount||0)+montant};
              });
              setTxs(t2); persist({txs:t2});
              showToast("Paiement enregistré ✓");
            }}
            products={products}
          />
        )}

        {/* ── HISTORY ── */}
        {tab==="history"&&(
          <HistoryTab
            txs={txs} invoices={invoices} lang={lang}
            histFilter={histFilter} setHistFilter={setHistFilter}
            dateFrom={dateFrom} setDateFrom={setDateFrom}
            dateTo={dateTo} setDateTo={setDateTo}
            histSearch={histSearch} setHistSearch={setHistSearch}
            confirmDelTx={confirmDelTx} setConfirmDelTx={setConfirmDelTx}
            delTx={delTx} setPreviewInvoice={setPreviewInvoice}
          />
        )}

        {/* ── RAPPORT ── */}
        {tab==="rapport"&&(
          <RapportTab
            txs={txs} invoices={invoices} lang={lang}
            rapportMonth={rapportMonth} setRapportMonth={setRapportMonth}
            rapportYear={rapportYear} setRapportYear={setRapportYear}
            setPreviewInvoice={setPreviewInvoice}
          />
        )}
      </div>{/* end CONTENT */}
      </div>{/* end MAIN */}

      {/* BOTTOM BAR mobile */}
      <div style={{position:"fixed",bottom:0,left:220,right:0,padding:"10px 24px 16px",background:"linear-gradient(to top,#f1f5f9 75%,transparent)",display:"none",gap:8,boxSizing:"border-box"}} className="mobile-bar">
        <button onClick={()=>setModal("expense")} style={{flex:"0 0 52px",padding:"14px 0",background:"#fef2f2",border:"1.5px solid #fecaca",borderRadius:14,fontSize:20,cursor:"pointer"}}>–</button>
        <button onClick={()=>{setInvoicePreselect(null);setModal("invoice");}} style={{flex:2,padding:"14px",background:"#2563EB",border:"none",borderRadius:14,fontSize:14,fontWeight:800,color:"#fff",cursor:"pointer",boxShadow:"0 8px 20px rgba(37,99,235,.4)"}}>🧾 {t.newInvoice}</button>
        <button onClick={()=>setModal("income")} style={{flex:"0 0 52px",padding:"14px 0",background:"#ecfdf5",border:"1.5px solid #a7f3d0",borderRadius:14,fontSize:20,cursor:"pointer"}}>+</button>
      </div>

      {/* تأكيد الخروج */}
      {confirmLogout&&(
        <div onClick={()=>setConfirmLogout(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,backdropFilter:"blur(4px)",padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:28,width:"100%",maxWidth:320,boxShadow:"0 24px 64px rgba(0,0,0,.25)",animation:"up .2s cubic-bezier(.22,1,.36,1)",textAlign:"center"}}>
            <div style={{fontSize:44,marginBottom:12}}>🚪</div>
            <div style={{fontWeight:900,fontSize:17,color:"#111",marginBottom:8}}>Déconnexion ?</div>
            <div style={{fontSize:13,color:"#6b7280",marginBottom:24}}>Toutes vos données sont sauvegardées automatiquement.</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button onClick={()=>setConfirmLogout(false)} style={{padding:14,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>Annuler</button>
              <button onClick={()=>{setConfirmLogout(false);handleLogout();}} style={{padding:14,borderRadius:12,border:"none",fontSize:14,fontWeight:800,color:"#fff",background:"#ef4444",cursor:"pointer"}}>Déconnexion</button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      {(modal==="income"||modal==="expense")&&<TxModal initType={modal} onSave={tx=>{setTxs(p=>[tx,...p]);setModal(null);}} onClose={()=>setModal(null)} lang={lang}/>}
      {modal==="invoice"&&<InvoiceModal products={products} customers={customers} invoices={invoices} onClose={()=>{setModal(null);setInvoicePreselect(null);setDuplicateInv(null);}} onCreated={handleInvoiceCreated} lang={lang} companyName={effectiveCompanyName} preselectedCustomer={invoicePreselect} bizSettings={bizSettings} duplicate={duplicateInv}/>}
      {modal==="products"&&<ProductsModal products={products} onSave={saveProduct} onDelete={delProduct} onClose={()=>setModal(null)} lang={lang}/>}
      {modal==="settings"&&<SettingsModal companyName={effectiveCompanyName} settings={bizSettings} onSave={(name,s)=>{setCompanyName(name);setBizSettings(s);persist({companyName:name,bizSettings:s});showToast(t.settingsSaved);}} onClose={()=>setModal(null)} lang={lang}/>}
      {modal==="newCustomer"&&<CustomerModal onSave={c=>{saveCustomer(c);setModal(null);showToast("Client ajouté ✓");}} onClose={()=>setModal(null)} lang={lang}/>}
      {editingCustomer&&<CustomerModal existing={editingCustomer} onSave={c=>{saveCustomer(c);setEditingCustomer(null);setSelectedCustomer(c);showToast("Client modifié ✓");}} onClose={()=>setEditingCustomer(null)} lang={lang}/>}

      {/* تأكيد الإيصال */}
      {confirmTx&&(
        <div onClick={()=>setConfirmTx(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,backdropFilter:"blur(4px)",padding:20}}>
          <div onClick={e=>e.stopPropagation()} dir={rtl?"rtl":"ltr"} style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:360,boxShadow:"0 24px 64px rgba(0,0,0,.2)",animation:"up .2s cubic-bezier(.22,1,.36,1)"}}>
            <div style={{width:52,height:52,borderRadius:16,background:"#ecfdf5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,marginBottom:16}}>✅</div>
            <div style={{fontWeight:900,fontSize:17,color:"#111",marginBottom:8}}>{t.confirmPaid}</div>
            <div style={{fontSize:14,color:"#6b7280",marginBottom:6,lineHeight:1.5}}>{t.confirmPaidMsg(confirmTx.client||confirmTx.desc,fmt(confirmTx.amount,lang))}</div>
            {confirmTx.invoiceId&&<div style={{fontSize:12,color:"#9ca3af",marginBottom:20}}>📄 {confirmTx.invoiceId}</div>}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:20}}>
              <button onClick={()=>setConfirmTx(null)} style={{padding:"13px",borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:700,color:"#6b7280",background:"#fff",cursor:"pointer"}}>{t.confirmNo}</button>
              <button onClick={()=>{markPaid(confirmTx.id);setConfirmTx(null);showToast(t.markPaid+" ✓");}} style={{padding:"13px",borderRadius:12,border:"none",fontSize:14,fontWeight:800,color:"#fff",background:"#10B981",cursor:"pointer"}}>{t.confirmYes}</button>
            </div>
          </div>
        </div>
      )}

      {detailTx&&<InvoicePDFModal invoice={detailTx} lang={lang} onClose={()=>setDetailTx(null)} relatedTxs={txs.filter(tx=>tx.invoiceId===detailTx.id)} onAddPayment={newTx=>handleAddPayment(newTx,detailTx.id)} bizSettings={bizSettings} onIncrementBL={()=>{const nb={...bizSettings,blCounter:(bizSettings.blCounter||1)+1};setBizSettings(nb);persist({bizSettings:nb});}} onIncrementBC={()=>{const nb={...bizSettings,bcCounter:(bizSettings.bcCounter||1)+1};setBizSettings(nb);persist({bizSettings:nb});}}/>}
      {previewInvoice&&<InvoicePDFModal invoice={previewInvoice} lang={lang} onClose={()=>setPreviewInvoice(null)} relatedTxs={txs.filter(tx=>tx.invoiceId===previewInvoice.id)} onAddPayment={newTx=>handleAddPayment(newTx,previewInvoice.id)} bizSettings={bizSettings} onIncrementBL={()=>{const nb={...bizSettings,blCounter:(bizSettings.blCounter||1)+1};setBizSettings(nb);persist({bizSettings:nb});}} onIncrementBC={()=>{const nb={...bizSettings,bcCounter:(bizSettings.bcCounter||1)+1};setBizSettings(nb);persist({bizSettings:nb});}}/>}
      {pendingRef&&<ReferralNotif referral={pendingRef} onClose={()=>setPendingRef(null)} lang={lang}/>}
      {showRefPanel&&<ReferralPanel user={user} lang={lang} onClose={()=>setShowRefPanel(false)}/>}

      {/* تأكيد حذف الفاتورة */}
      {confirmDelInvoice&&(
        <div onClick={()=>setConfirmDelInvoice(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,backdropFilter:"blur(4px)",padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:24,width:"100%",maxWidth:340,boxShadow:"0 24px 64px rgba(0,0,0,.25)",animation:"up .2s cubic-bezier(.22,1,.36,1)"}}>
            <div style={{fontSize:40,textAlign:"center",marginBottom:12}}>🗑</div>
            <div style={{fontWeight:900,fontSize:16,color:"#111",marginBottom:8,textAlign:"center"}}>Supprimer cette facture ?</div>
            <div style={{background:"#f9fafb",borderRadius:12,padding:"12px 14px",marginBottom:6,textAlign:"center"}}>
              <div style={{fontWeight:700,fontSize:15,color:"#111"}}>{confirmDelInvoice.id}</div>
              <div style={{fontSize:13,color:"#6b7280"}}>{confirmDelInvoice.customer} · {fmt(confirmDelInvoice.total,lang)}</div>
            </div>
            <div style={{background:"#fef2f2",borderRadius:10,padding:"8px 12px",marginBottom:20,fontSize:12,color:"#b91c1c",fontWeight:600}}>
              ⚠️ Les transactions liées seront aussi supprimées
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button onClick={()=>setConfirmDelInvoice(null)} style={{padding:13,borderRadius:12,border:"1.5px solid #e5e7eb",fontSize:14,fontWeight:600,color:"#6b7280",background:"#fff",cursor:"pointer"}}>Annuler</button>
              <button onClick={()=>{delInvoice(confirmDelInvoice.id);setConfirmDelInvoice(null);}} style={{padding:13,borderRadius:12,border:"none",fontSize:14,fontWeight:800,color:"#fff",background:"#ef4444",cursor:"pointer"}}>Supprimer</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes up{from{transform:translateY(50px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes fadeIn{from{opacity:0;transform:translateX(-50%) translateY(-8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
        body{margin:0;background:#f1f5f9}
        @media(max-width:768px){
          [style*="width:220px"]{display:none!important}
          [style*="marginLeft:220"],[style*="margin-left:220"]{margin-left:0!important;margin-right:0!important}
          .mobile-bar{display:flex!important;left:0!important}
          [style*="padding:28px 32px"]{padding:16px!important;padding-bottom:100px!important}
        }
      `}</style>
    </div>
  );
}
