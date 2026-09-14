import type { Locale } from './i18n';
import type { ProjectId } from './projects';

export type Project = {
  id: ProjectId; name: string; group: 'alisa' | 'personal'; tags: string[]; logo: string | null; tone: string;
  content: Record<Locale, { short: string; title: string; category: string; summary: string; role: string; status: string; architecture: string; features: { title: string; body: string }[] }>;
};

// Project summaries describe the original applications; no private application code is included.
export const projects: Project[] = [
  {
    "id": "core",
    "name": "Core",
    "group": "alisa",
    "tags": [
      "React Native",
      "Expo",
      "TypeScript",
      "SQLite",
      "PostgreSQL"
    ],
    "logo": "/projects/core.png",
    "tone": "core",
    "content": {
      "es": {
        "short": "Core",
        "title": "Operaciones, con una base común.",
        "category": "GESTIÓN CORPORATIVA",
        "summary": "Aplicación de Alisa para centralizar compras y recursos internos. En WhiteLabel evoluciona como una app independiente que comparte componentes y plataforma con PioApp.",
        "role": "Desarrollo de la experiencia móvil y de la base compartida: navegación, menú por aplicación y rol, flujos de compras y trabajo sin conexión.",
        "status": "WhiteLabel en evolución",
        "architecture": "Una entrada propia para Core, paquetes compartidos de interfaz, contratos y menú, y una capa de servicios separada de la aplicación.",
        "features": [
          {
            "title": "Compras y aprobaciones",
            "body": "Solicitudes y órdenes de compra con listados, detalle y decisiones dentro de la propuesta móvil."
          },
          {
            "title": "Accesos por rol",
            "body": "Catálogo de módulos configurable por aplicación y perfil, con favoritos y administración del menú."
          },
          {
            "title": "Trabajo sin conexión",
            "body": "Borradores y cola local en SQLite para conservar operaciones pendientes. La migración de los módulos de negocio sigue en curso."
          }
        ]
      },
      "en": {
        "short": "Core",
        "title": "Operations on a shared foundation.",
        "category": "BUSINESS OPERATIONS",
        "summary": "An Alisa application bringing purchasing and internal resources together. Within WhiteLabel, it is evolving as an independent app that shares components and a platform with PioApp.",
        "role": "Mobile experience and shared platform development: navigation, app- and role-based menus, purchasing workflows and offline support.",
        "status": "WhiteLabel in development",
        "architecture": "A dedicated Core entry point, shared UI, contract and menu packages, and a service layer separate from the app.",
        "features": [
          {
            "title": "Purchasing and approvals",
            "body": "Purchase requests and orders with lists, details and decisions in the mobile proposal."
          },
          {
            "title": "Role-based access",
            "body": "A module catalog configured by app and role, with favorites and menu administration."
          },
          {
            "title": "Offline work",
            "body": "SQLite drafts and a local queue preserve pending operations. Business module migration is still in progress."
          }
        ]
      },
      "ja": {
        "short": "Core",
        "title": "共通の基盤で、業務をつなぐ。",
        "category": "社内業務",
        "summary": "購買と社内リソースをまとめるAlisaのアプリ。WhiteLabelではPioAppとコンポーネントや基盤を共有しながら、独立したアプリとして開発を進めています。",
        "role": "モバイル画面と共通基盤の開発。ナビゲーション、アプリ・役割別メニュー、購買フロー、オフライン対応に取り組んでいます。",
        "status": "WhiteLabel版を開発中",
        "architecture": "Core専用の起動構成と、UI・データ契約・メニューの共通パッケージ。サービス層をアプリから分離しています。",
        "features": [
          {
            "title": "購買と承認",
            "body": "モバイルの提案版に、購買申請・発注の一覧、詳細、判断のフローを実装。"
          },
          {
            "title": "役割に応じたアクセス",
            "body": "アプリと役割に応じたモジュール設定、お気に入り、メニュー管理。"
          },
          {
            "title": "オフラインでの作業",
            "body": "SQLiteに下書きと送信待ちの操作を保存。業務モジュールの移行は継続中です。"
          }
        ]
      }
    }
  },
  {
    "id": "pioapp",
    "name": "PioApp",
    "group": "alisa",
    "tags": [
      "React Native",
      "Expo Router",
      "TypeScript",
      "SQLite",
      "PostgreSQL"
    ],
    "logo": "/projects/pioapp.png",
    "tone": "pio",
    "content": {
      "es": {
        "short": "PioApp",
        "title": "El equipo, siempre conectado.",
        "category": "EXPERIENCIA DEL COLABORADOR",
        "summary": "Aplicación de Alisa orientada a colaboradores y operación de tiendas. Su variante en WhiteLabel mantiene identidad propia sobre una plataforma compartida con Core.",
        "role": "Desarrollo móvil de recursos para colaboradores, formularios operativos, publicaciones y una estructura modular que permite separar las dos aplicaciones.",
        "status": "WhiteLabel en evolución",
        "architecture": "PioApp tiene su propia entrada y marca. Comparte interfaz, navegación y contratos con Core, con opciones y avisos definidos por aplicación.",
        "features": [
          {
            "title": "Recursos del colaborador",
            "body": "Boletas, publicaciones, avisos y carné digital reunidos en la navegación de la propuesta."
          },
          {
            "title": "Operación de tiendas",
            "body": "Recorridos de papelería, visitas, recepción de rutas e inspecciones mediante formularios."
          },
          {
            "title": "Continuidad móvil",
            "body": "Favoritos y registros locales persistentes. El marcaje y otras integraciones se presentan según su fase de implementación."
          }
        ]
      },
      "en": {
        "short": "PioApp",
        "title": "Keeping the team connected.",
        "category": "EMPLOYEE EXPERIENCE",
        "summary": "An Alisa app for employees and store operations. Its WhiteLabel variant retains its own identity on a platform shared with Core.",
        "role": "Mobile development of employee resources, operational forms, publications and a modular structure that separates the two applications.",
        "status": "WhiteLabel in development",
        "architecture": "PioApp has its own entry point and branding. It shares UI, navigation and contracts with Core, with app-specific options and notices.",
        "features": [
          {
            "title": "Employee resources",
            "body": "Payslips, publications, notices and a digital ID within the proposal navigation."
          },
          {
            "title": "Store operations",
            "body": "Form-based workflows for paperwork, visits, route reception and inspections."
          },
          {
            "title": "Mobile continuity",
            "body": "Persistent favorites and local records. Attendance and other integrations reflect their current implementation stage."
          }
        ]
      },
      "ja": {
        "short": "PioApp",
        "title": "チームを、いつでも身近に。",
        "category": "従業員向けアプリ",
        "summary": "Alisaの従業員と店舗業務を支えるアプリ。WhiteLabel版はCoreと基盤を共有しながら、独自のブランドを保っています。",
        "role": "従業員向け機能、業務フォーム、社内のお知らせを開発。2つのアプリを分離できるモジュール構成に取り組んでいます。",
        "status": "WhiteLabel版を開発中",
        "architecture": "PioApp専用の起動構成とブランド。UI・ナビゲーション・データ契約をCoreと共有し、メニューと通知をアプリ別に構成します。",
        "features": [
          {
            "title": "従業員向けリソース",
            "body": "提案版のナビゲーションに、給与明細、投稿、通知、デジタル社員証を集約。"
          },
          {
            "title": "店舗の日常業務",
            "body": "書類、訪問、配送ルートの受け入れ、点検をフォームで扱うフロー。"
          },
          {
            "title": "モバイルで作業を継続",
            "body": "お気に入りとローカル記録を保存。勤怠などの連携機能は実装段階に応じて表示しています。"
          }
        ]
      }
    }
  },
  {
    "id": "pinulito",
    "name": "Pinulito Delivery",
    "group": "alisa",
    "tags": [
      "Next.js",
      "React Native",
      "Expo",
      "Node.js",
      "PostgreSQL"
    ],
    "logo": "/projects/pinulito.png",
    "tone": "pinulito",
    "content": {
      "es": {
        "short": "Pinulito Delivery",
        "title": "Del menú a la entrega.",
        "category": "PEDIDOS WEB & MÓVIL",
        "summary": "Experiencia de pedidos para Pinulito que reúne web, aplicación móvil y servicios de backend para delivery y pickup.",
        "role": "Desarrollo de interfaces de compra y servicios para catálogo, pedidos, sucursales y fidelización, con una base compartida de procesos de negocio.",
        "status": "Web, app y backend en desarrollo",
        "architecture": "Tres aplicaciones coordinadas: web con Next.js, móvil con Expo y API con Node.js. Los servicios separan pedidos, catálogo, usuarios y pagos.",
        "features": [
          {
            "title": "Comprar a tu manera",
            "body": "Catálogo, personalización de productos, carrito y selección entre entrega y recogida."
          },
          {
            "title": "Seguir el pedido",
            "body": "Pantallas de estado de pedido, selección de sucursal y seguimiento de entrega."
          },
          {
            "title": "Volver por más",
            "body": "Club de lealtad y una capa de integración con pagos y sistemas de punto de venta."
          }
        ]
      },
      "en": {
        "short": "Pinulito Delivery",
        "title": "From menu to delivery.",
        "category": "WEB & MOBILE ORDERING",
        "summary": "An ordering experience for Pinulito combining a website, mobile app and backend services for delivery and pickup.",
        "role": "Shopping interfaces and services for catalogs, orders, stores and loyalty, built around shared business processes.",
        "status": "Web, app and backend in development",
        "architecture": "Three coordinated applications: Next.js web, Expo mobile and a Node.js API. Services separate orders, catalogs, users and payments.",
        "features": [
          {
            "title": "Choose how to order",
            "body": "Catalog, product customization, cart and a choice of delivery or pickup."
          },
          {
            "title": "Follow the order",
            "body": "Order-status screens, store selection and delivery tracking."
          },
          {
            "title": "A reason to return",
            "body": "A loyalty club and an integration layer for payments and point-of-sale systems."
          }
        ]
      },
      "ja": {
        "short": "Pinulito Delivery",
        "title": "メニューから、お届けまで。",
        "category": "ウェブ・モバイル注文",
        "summary": "Pinulitoのデリバリーと店頭受取を支える、ウェブ、モバイルアプリ、バックエンドを組み合わせた注文体験。",
        "role": "商品一覧、注文、店舗、ロイヤルティの画面とサービスを開発。共通の業務プロセスを基盤にしています。",
        "status": "ウェブ・アプリ・APIを開発中",
        "architecture": "Next.jsのウェブ、Expoのモバイル、Node.jsのAPIで構成。注文、商品、ユーザー、決済のサービスを分離しています。",
        "features": [
          {
            "title": "好きな方法で注文",
            "body": "商品一覧、カスタマイズ、カート、配達と店頭受取の選択。"
          },
          {
            "title": "注文状況を確認",
            "body": "注文状況の画面、店舗選択、配達の追跡。"
          },
          {
            "title": "また利用したくなる体験",
            "body": "ロイヤルティクラブと、決済・POSシステムへの連携層。"
          }
        ]
      }
    }
  },
  {
    "id": "scanlearn",
    "name": "ScanLearn",
    "group": "personal",
    "tags": [
      "React Native",
      "Expo",
      "Fastify",
      "OpenAI",
      "Prisma"
    ],
    "logo": "/projects/scanlearn.png",
    "tone": "scanlearn",
    "content": {
      "es": {
        "short": "ScanLearn",
        "title": "Del papel a lo que aprendes.",
        "category": "EDUCACIÓN & IA",
        "summary": "Aplicación que transforma páginas de libros en rutas de aprendizaje con explicaciones, ejemplos y ejercicios, organizadas en una biblioteca personal.",
        "role": "Desarrollo de la experiencia de estudio y del procesamiento de páginas: captura, extracción con IA, generación de lecciones, ejercicios y registro de progreso.",
        "status": "Proyecto personal en desarrollo",
        "architecture": "App Expo y API Fastify con PostgreSQL y Prisma. Un proceso de trabajo extrae el contenido de las páginas y genera lecciones estructuradas.",
        "features": [
          {
            "title": "Capturar una idea",
            "body": "Escanear o importar páginas y organizarlas por libro y tema."
          },
          {
            "title": "Aprender paso a paso",
            "body": "Lecciones con explicaciones, ejemplos y preguntas, generadas a partir del material seleccionado."
          },
          {
            "title": "Practicar y continuar",
            "body": "Ejercicios con pistas y retroalimentación, biblioteca con filtros y seguimiento del avance."
          }
        ]
      },
      "en": {
        "short": "ScanLearn",
        "title": "From paper to understanding.",
        "category": "EDUCATION & AI",
        "summary": "An app that turns book pages into learning paths with explanations, examples and exercises, organized in a personal library.",
        "role": "Study experience and page-processing development: capture, AI extraction, lesson generation, exercises and progress tracking.",
        "status": "Personal project in development",
        "architecture": "An Expo app and Fastify API with PostgreSQL and Prisma. A worker extracts page content and generates structured lessons.",
        "features": [
          {
            "title": "Capture an idea",
            "body": "Scan or import pages and organize them by book and topic."
          },
          {
            "title": "Learn step by step",
            "body": "Lessons with explanations, examples and questions generated from the selected material."
          },
          {
            "title": "Practice and continue",
            "body": "Exercises with hints and feedback, a searchable library and progress tracking."
          }
        ]
      },
      "ja": {
        "short": "ScanLearn",
        "title": "紙のページを、学びへ。",
        "category": "教育とAI",
        "summary": "本のページから解説、例題、練習問題を含む学習ルートを作り、自分のライブラリで整理するアプリ。",
        "role": "学習体験とページ処理を開発。撮影、AIによる読み取り、レッスン生成、練習問題、進捗記録をつなぎます。",
        "status": "個人プロジェクト・開発中",
        "architecture": "Expoアプリと、PostgreSQL・Prismaを使うFastify API。ワーカーがページの内容を抽出し、構造化されたレッスンを生成します。",
        "features": [
          {
            "title": "気になる内容を取り込む",
            "body": "ページをスキャンまたは読み込み、本やトピックごとに整理。"
          },
          {
            "title": "一歩ずつ理解する",
            "body": "選択した教材をもとに、解説、例題、質問を含むレッスンを作成。"
          },
          {
            "title": "練習して、続きへ",
            "body": "ヒントと解説付きの問題、検索できるライブラリ、学習進捗の記録。"
          }
        ]
      }
    }
  },
  {
    "id": "chatmenu",
    "name": "ChatMenu",
    "group": "personal",
    "tags": [
      "React",
      "React Native",
      "Node.js",
      "Gemini",
      "Socket.IO"
    ],
    "logo": null,
    "tone": "chatmenu",
    "content": {
      "es": {
        "short": "ChatMenu",
        "title": "Una conversación. Un pedido.",
        "category": "AUTOMATIZACIÓN & IA",
        "summary": "MVP para pequeños negocios que convierte conversaciones de WhatsApp en pedidos y los organiza en un tablero compartido para web y móvil.",
        "role": "Desarrollo full-stack del flujo de pedidos: conexión de WhatsApp, interpretación con IA, gestión del menú y actualización del tablero en tiempo real.",
        "status": "MVP personal",
        "architecture": "Monorepo con backend Express, panel React, app Expo y tipos compartidos. Baileys conecta WhatsApp; Gemini interpreta conversaciones y Socket.IO actualiza el tablero.",
        "features": [
          {
            "title": "Pedidos por conversación",
            "body": "Interpretación de productos, cantidades y extras a partir de mensajes de WhatsApp."
          },
          {
            "title": "Una vista para el negocio",
            "body": "Tablero Kanban en web y móvil para revisar pedidos y cambiar su estado."
          },
          {
            "title": "Menú y negocio",
            "body": "Gestión de productos y sesiones por negocio. Suscripciones y otras funciones comerciales quedan fuera del MVP actual."
          }
        ]
      },
      "en": {
        "short": "ChatMenu",
        "title": "One conversation. One order.",
        "category": "AUTOMATION & AI",
        "summary": "An MVP for small businesses that turns WhatsApp conversations into orders and organizes them in a shared web and mobile board.",
        "role": "Full-stack ordering flow: WhatsApp connection, AI interpretation, menu management and real-time board updates.",
        "status": "Personal MVP",
        "architecture": "A monorepo with an Express backend, React dashboard, Expo app and shared types. Baileys connects WhatsApp, Gemini interprets conversations and Socket.IO updates the board.",
        "features": [
          {
            "title": "Conversational ordering",
            "body": "Interpret products, quantities and extras from WhatsApp messages."
          },
          {
            "title": "A shared business view",
            "body": "A web and mobile Kanban board to review orders and change their status."
          },
          {
            "title": "Menu and business",
            "body": "Product and session management per business. Subscriptions and other commercial features are outside the current MVP."
          }
        ]
      },
      "ja": {
        "short": "ChatMenu",
        "title": "会話が、そのまま注文に。",
        "category": "自動化とAI",
        "summary": "小規模店舗向けのMVP。WhatsAppの会話を注文に変え、ウェブとモバイルで共有するボードに整理します。",
        "role": "WhatsApp接続、AIによる注文の理解、メニュー管理、リアルタイム更新を含むフルスタック開発。",
        "status": "個人開発のMVP",
        "architecture": "Expressのバックエンド、Reactの管理画面、Expoアプリ、共通の型をまとめたモノレポ。Baileys、Gemini、Socket.IOを組み合わせています。",
        "features": [
          {
            "title": "会話で注文",
            "body": "WhatsAppのメッセージから商品、数量、追加オプションを読み取る。"
          },
          {
            "title": "店舗の注文をひと目で",
            "body": "ウェブとモバイルのカンバンで注文を確認し、状態を更新。"
          },
          {
            "title": "メニューと店舗管理",
            "body": "店舗別の商品・セッション管理。サブスクリプションなどは現時点のMVP対象外です。"
          }
        ]
      }
    }
  },
  {
    "id": "proferre",
    "name": "Proferre",
    "group": "personal",
    "tags": [
      "Astro",
      "TypeScript",
      "Supabase",
      "CSS"
    ],
    "logo": "/projects/proferre.png",
    "tone": "proferre",
    "content": {
      "es": {
        "short": "Proferre",
        "title": "Un catálogo que abre conversaciones.",
        "category": "WEB COMERCIAL",
        "summary": "Sitio comercial y catálogo digital de suministros industriales, con categorías, búsqueda de productos y acceso directo a cotizaciones por WhatsApp.",
        "role": "Desarrollo del sitio con Astro, catálogo conectado a Supabase, navegación por categorías y herramientas de administración de productos.",
        "status": "Sitio y catálogo implementados",
        "architecture": "Astro para las páginas y componentes del sitio, Supabase para el catálogo y una interfaz de administración de productos.",
        "features": [
          {
            "title": "Encontrar el producto",
            "body": "Catálogo con buscador, filtros por categoría y detalle del producto."
          },
          {
            "title": "Pedir una cotización",
            "body": "Acceso a WhatsApp desde la ficha con el producto de interés incluido en el mensaje."
          },
          {
            "title": "Mantener el catálogo",
            "body": "Administración de productos y disponibilidad de catálogos descargables."
          }
        ]
      },
      "en": {
        "short": "Proferre",
        "title": "A catalog that starts conversations.",
        "category": "BUSINESS WEBSITE",
        "summary": "A commercial website and digital industrial-supply catalog with categories, product search and direct access to WhatsApp quotations.",
        "role": "Astro website development, a Supabase-connected catalog, category navigation and product administration tools.",
        "status": "Website and catalog implemented",
        "architecture": "Astro pages and components, Supabase for the catalog and a product administration interface.",
        "features": [
          {
            "title": "Find a product",
            "body": "A catalog with search, category filters and product details."
          },
          {
            "title": "Request a quotation",
            "body": "A WhatsApp link from the product sheet with the selected product in the message."
          },
          {
            "title": "Maintain the catalog",
            "body": "Product administration and downloadable catalogs."
          }
        ]
      },
      "ja": {
        "short": "Proferre",
        "title": "商品を見つけ、相談につなぐ。",
        "category": "企業向けウェブサイト",
        "summary": "工業用品の企業サイトとデジタルカタログ。カテゴリ、商品検索、WhatsAppでの見積もり相談を備えています。",
        "role": "Astroによるサイト開発、Supabaseに接続するカタログ、カテゴリ別ナビゲーション、商品管理機能を実装。",
        "status": "サイト・カタログを実装済み",
        "architecture": "Astroのページとコンポーネント、Supabaseの商品カタログ、商品を管理する画面で構成。",
        "features": [
          {
            "title": "商品を探す",
            "body": "検索、カテゴリフィルター、商品詳細を備えたカタログ。"
          },
          {
            "title": "見積もりを相談",
            "body": "商品名を含むメッセージで、商品詳細からWhatsAppへ。"
          },
          {
            "title": "カタログを更新",
            "body": "商品管理と、ダウンロードできるカタログ。"
          }
        ]
      }
    }
  },
  {
    "id": "portfolio",
    "name": "Tinta y píxel",
    "group": "personal",
    "tags": [
      "Next.js",
      "TypeScript",
      "Motion",
      "CSS"
    ],
    "logo": null,
    "tone": "portfolio",
    "content": {
      "es": {
        "short": "Tinta y píxel",
        "title": "Código, tinta y curiosidad.",
        "category": "PORTAFOLIO MULTILINGÜE",
        "summary": "Este portafolio combina caligrafía japonesa, pixel art y un celular interactivo para presentar mi trabajo y trayectoria en tres idiomas.",
        "role": "Diseño e implementación del sitio, fichas de proyectos, demostraciones locales, animaciones, accesibilidad y contenido multilingüe.",
        "status": "Disponible en este sitio",
        "architecture": "Next.js con rutas en español, inglés y japonés, contenido tipado y componentes interactivos en React. Las preferencias de tema y movimiento se conservan localmente.",
        "features": [
          {
            "title": "Explorar el trabajo",
            "body": "Un celular navegable y un catálogo de proyectos profesionales y personales."
          },
          {
            "title": "Elegir tu idioma",
            "body": "Interfaz y CV en español, inglés y japonés, con selección independiente para descargar el documento."
          },
          {
            "title": "Movimiento con intención",
            "body": "Entradas escalonadas, tinta animada y soporte para movimiento reducido, teclado y tamaños de pantalla distintos."
          }
        ]
      },
      "en": {
        "short": "Tinta y píxel",
        "title": "Code, ink and curiosity.",
        "category": "MULTILINGUAL PORTFOLIO",
        "summary": "This portfolio combines Japanese calligraphy, pixel art and an interactive phone to present my work and career in three languages.",
        "role": "Site design and implementation, project case studies, local demos, motion, accessibility and multilingual content.",
        "status": "Available on this site",
        "architecture": "Next.js with Spanish, English and Japanese routes, typed content and interactive React components. Theme and motion preferences are stored locally.",
        "features": [
          {
            "title": "Explore the work",
            "body": "A navigable phone and a catalog of professional and personal projects."
          },
          {
            "title": "Choose your language",
            "body": "Interface and CV in Spanish, English and Japanese, with an independent document language selector."
          },
          {
            "title": "Purposeful motion",
            "body": "Staggered entrances, animated ink and support for reduced motion, keyboard navigation and different screen sizes."
          }
        ]
      },
      "ja": {
        "short": "Tinta y píxel",
        "title": "コードと墨、そして好奇心。",
        "category": "多言語ポートフォリオ",
        "summary": "日本の書、ピクセルアート、操作できるスマートフォンを組み合わせ、制作事例と経歴を3言語で紹介するポートフォリオです。",
        "role": "サイトのデザインと実装、プロジェクト紹介、ローカルデモ、アニメーション、アクセシビリティ、多言語コンテンツを制作。",
        "status": "このサイトで公開",
        "architecture": "スペイン語・英語・日本語のルートを持つNext.js。型付きコンテンツとReactの操作画面を使い、テーマと動きの設定をローカルに保存します。",
        "features": [
          {
            "title": "制作事例を見る",
            "body": "操作できるスマートフォンと、仕事・個人開発のプロジェクト一覧。"
          },
          {
            "title": "言語を選ぶ",
            "body": "3言語の画面と職務経歴書。書類のダウンロード言語は個別に選べます。"
          },
          {
            "title": "意味のある動き",
            "body": "段階的な表示と墨のアニメーション。動きを抑える設定、キーボード、各画面サイズに対応。"
          }
        ]
      }
    }
  }
];
