import type { Locale } from './i18n';
export type DemoId = 'residence' | 'bots' | 'erp';
export type ProjectId = 'core' | 'pioapp' | 'pinulito' | 'scanlearn' | 'chatmenu' | 'proferre' | 'explicamelofacil' | 'portfolio';
export type PhoneScreen = ProjectId | DemoId;
export type DemoProject = {
  id: DemoId;
  tags: string[];
  period: string;
  content: Record<Locale, { title: string; category: string; summary: string; role: string; short: string }>;
};
// These cases describe the CV. The interactive screens are explicitly labelled sample experiences.
// These examples remain available as a separate playground alongside the real project catalog.
export const demoProjects: DemoProject[] = [
  { id: 'residence', period: '2021 - 2022', tags: ['Laravel', 'MySQL', 'React Native'], content: {
    es: { title: 'Una comunidad, conectada.', short: 'Gestión residencial', category: 'WEB & MOBILE', summary: 'Portales para residentes y administradores que llevan los procesos de una comunidad a una experiencia digital.', role: 'Desarrollo de sistemas web y aplicaciones móviles, bases de datos y control de limpieza con QR.' },
    en: { title: 'A connected community.', short: 'Residential management', category: 'WEB & MOBILE', summary: 'Resident and administrator portals that bring everyday community processes into a digital experience.', role: 'Web and mobile development, databases and QR-based cleaning management.' },
    ja: { title: 'つながるコミュニティ。', short: '住まいの管理', category: 'WEB & MOBILE', summary: '居住者と管理者のためのポータル。コミュニティの日々の業務をデジタルにつなぎます。', role: 'ウェブ・モバイル開発、データベース設計、QRコードによる清掃管理。' },
  } },
  { id: 'bots', period: '2022 - 2026', tags: ['Angular', 'Node.js', 'GCP'], content: {
    es: { title: 'Conversaciones que resuelven.', short: 'Bots y automatización', category: 'AUTOMATIZACIÓN', summary: 'Bots multicanal e integraciones que conectan la atención al cliente con los sistemas de la empresa.', role: 'Desarrollo de bots, plataforma de creación en Angular, integración de APIs y operación de servicios en Google Cloud.' },
    en: { title: 'Conversations that help.', short: 'Bots & automation', category: 'AUTOMATION', summary: 'Multichannel bots and integrations that connect customer support with business systems.', role: 'Bot development, an Angular bot-building platform, API integration and Google Cloud operations.' },
    ja: { title: '会話から、解決へ。', short: 'ボットと自動化', category: '自動化', summary: 'マルチチャネルのボットと連携機能で、顧客対応と社内システムをつなぎます。', role: 'ボット開発、Angularによる作成プラットフォーム、API連携、Google Cloudのサービス運用。' },
  } },
  { id: 'erp', period: '2026', tags: ['TypeScript', 'React Native', 'AWS'], content: {
    es: { title: 'Todo un negocio en movimiento.', short: 'Ecosistema ERP', category: 'PRODUCTO & ARQUITECTURA', summary: 'Aplicaciones web y móviles que conectan operaciones internas, pedidos y procesos de negocio.', role: 'Desarrollo full-stack, servicios con Node.js y PostgreSQL, despliegues en AWS, revisión de código y mentoría.' },
    en: { title: 'A business in motion.', short: 'ERP ecosystem', category: 'PRODUCT & ARCHITECTURE', summary: 'Web and mobile applications connecting internal operations, orders and business processes.', role: 'Full-stack development, Node.js and PostgreSQL services, AWS deployments, code reviews and mentoring.' },
    ja: { title: 'ビジネス全体を動かす。', short: 'ERPシステム', category: 'プロダクトと設計', summary: '社内業務、注文、ビジネスプロセスをつなぐウェブ・モバイルアプリ。', role: 'フルスタック開発、Node.jsとPostgreSQL、AWSへのデプロイ、コードレビュー、メンタリング。' },
  } },
];
export const experience = [
  { company: 'Plani-go', period: '2021 - 2022', tech: 'PHP / Laravel / MySQL / React Native', content: {
    es: { role: 'Programador full-stack', title: 'Construir de principio a fin.', body: 'Aplicaciones web y móviles para residentes y administradores. Diseñé bases de datos, revisé código y creé una app con QR para el personal de limpieza que reemplazó las hojas de firma en papel y alimentaba asistencia y planilla.' },
    en: { role: 'Full-stack developer', title: 'Building from start to finish.', body: 'Web and mobile applications for residents and administrators. I designed databases, reviewed code and built a QR-based cleaning-staff app that replaced paper sign-in sheets and fed attendance and payroll.' },
    ja: { role: 'フルスタック開発者', title: '最初から最後まで作る。', body: '居住者と管理者向けのウェブ・モバイルアプリを開発。データベース設計とコードレビューを担当し、紙の出勤表に代わるQRコード式の清掃スタッフ用アプリで勤怠と給与計算につなげました。' },
  } },
  { company: 'iSoft-ste', period: '2022 - 2026', tech: 'Angular / Node.js / Express / Google Cloud / Firebase / Docker', content: {
    es: { role: 'Especialista en desarrollo de bots', title: 'Conectar sistemas y conversaciones.', body: 'Levanté requisitos directamente con clientes empresariales y construí bots de WhatsApp y Facebook con sus sistemas de tickets. Creé una plataforma interna de bots en Angular y Node.js conectada por APIs a cada cliente, y operé los servicios en Google Cloud.' },
    en: { role: 'Bot development specialist', title: 'Connecting systems and conversations.', body: 'I ran requirements sessions directly with enterprise clients and built WhatsApp and Facebook bots with their ticketing systems. I created an in-house bot platform in Angular and Node.js, connected to each client over APIs, and ran the services on Google Cloud.' },
    ja: { role: 'ボット開発スペシャリスト', title: 'システムと会話をつなぐ。', body: '企業のお客様と直接要件をまとめ、WhatsAppやFacebookのボットとチケット管理システムを開発。AngularとNode.jsで社内のボット作成基盤を作り、APIで各社のシステムとつなぎ、Google Cloudで運用しました。' },
  } },
  { company: 'Corporación Alisa', period: '2026', tech: 'React Native / Node.js / PostgreSQL / AWS / SAP Business One / Stripe', content: {
    es: { role: 'Senior developer / Líder de desarrollo', title: 'Pensar en el producto y el equipo.', body: 'Lideré desde cero la app interna para ~10.000 empleados, la app de oficinas centrales integrada con SAP Business One y una app de pedidos para millones de usuarios. Digitalizar la contabilidad redujo un proceso de dos meses a dos días y los pedidos anticipados recortaron un 80 % la espera en tienda.' },
    en: { role: 'Senior developer / Development lead', title: 'Thinking about the product and the team.', body: 'I led, from scratch, the internal app for ~10,000 employees, the head-office app integrated with SAP Business One and an ordering app serving millions of users. Digitising accounting cut a two-month process to two days, and order-ahead pickup reduced in-store waiting by 80%.' },
    ja: { role: 'シニア開発者 / 開発リーダー', title: 'プロダクトとチームを考える。', body: '約1万人の従業員向け社内アプリ、SAP Business Oneと連携した本社向けアプリ、数百万人が使う注文アプリをゼロから開発しました。経理のデジタル化で2か月かかっていた業務を2日に短縮し、事前注文で店頭の待ち時間を80%削減しました。' },
  } },
];
export const social = {
  email: 'william.burrion@gmail.com',
  linkedin: 'https://www.linkedin.com/in/william-burri%C3%B3n-b99644255/',
  github: 'https://github.com/QPWilliam',
};

export { projects } from './project-catalog';
