import { Tour, Service, SiteSettings } from '../types';

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'InGeorgiaTours',
  tagline: 'აღმოაჩინე საქართველოს გამორჩეული კუთხეები',
  taglineEn: 'Discover Georgia’s Most Breathtaking Destinations',
  whatsappNumber: '995555123456',
  displayPhone: '+995 555 12 34 56',
  email: 'info@ingeorgiatours.ge',
  location: 'თბილისი, საქართველო',
  locationEn: 'Tbilisi, Georgia',
  workHours: 'ყოველდღე: 09:00 - 21:00',
  workHoursEn: 'Everyday: 09:00 - 21:00 (GMT+4)',
  priceDisclaimer: '* საიტზე მითითებული ფასები არის საინფორმაციო ხასიათის. საბოლოო ღირებულება დამოკიდებულია ადამიანების რაოდენობაზე, სეზონსა და თქვენს მოთხოვნებზე.',
  priceDisclaimerEn: '* All prices listed on this website are indicative. The final quote depends on group size, travel season, and customized requirements.',
  aboutText: 'ჩვენ გთავაზობთ ინდივიდუალურ და მცირე ჯგუფურ ტურებს მთელ საქართველოში, ასევე ტრანსფერებსა და გიდის მომსახურებას.',
  aboutTextEn: 'We provide tailor-made private tours, small group adventures, airport transfers, and certified guide services across Georgia.',
  backgroundColor: '#F9F7F2',
  heroCoverImage: '',
  heroCoverOverlayOpacity: 35,
  heroTextColorMode: 'auto',
  heroCoverPositionMobile: 'center',
  heroCoverPositionDesktop: 'center'
};

export const DEFAULT_TOURS: Tour[] = [
  {
    id: 'kazbegi-gergeti',
    title: 'ყაზბეგი & გერგეტის სამება',
    titleEn: 'Kazbegi & Gergeti Trinity Church',
    region: 'მცხეთა-მთიანეთი',
    regionEn: 'Mtskheta-Mtianeti',
    duration: '1 დღე (9-10 სთ)',
    durationEn: '1 Day (9-10 hrs)',
    priceInfo: '130 ₾-დან / პერსონა',
    priceInfoEn: 'From 130 GEL / person',
    priceValue: 130,
    category: 'day_tour',
    shortDescription: 'ანანურის ციხე, ჟინვალის წყალსაცავი, გუდაურის პანორამა და გერგეტის სამება მყინვარწვერის ფონზე.',
    shortDescriptionEn: 'Ananuri Fortress, Zhinvali Reservoir, Gudauri Friendship Monument, and Gergeti Trinity Church at the foot of Mount Kazbek.',
    highlights: [
      'ჟინვალის წყალსაცავი',
      'ანანურის ციხესიმაგრე',
      'გუდაურის მეგობრობის მონუმენტი',
      'გერგეტის სამების ეკლესია (2,170 მ)'
    ],
    highlightsEn: [
      'Zhinvali Turquoise Reservoir',
      'Medieval Ananuri Fortress Complex',
      'Gudauri Panorama & Friendship Monument',
      'Gergeti Trinity Church (2,170m)'
    ],
    included: ['კომფორტული ტრანსპორტი', 'მძღოლი / გიდი', 'სასმელი წყალი'],
    includedEn: ['Comfortable Air-conditioned Vehicle', 'Professional Driver / Guide', 'Bottled Mineral Water'],
    imageUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    isActive: true
  },
  {
    id: 'kakheti-wine-tour',
    title: 'კახეთის ღვინისა & სიღნაღის ტური',
    titleEn: 'Kakheti Wine Tasting & Sighnaghi Tour',
    region: 'კახეთი',
    regionEn: 'Kakheti',
    duration: '1 დღე (8-9 სთ)',
    durationEn: '1 Day (8-9 hrs)',
    priceInfo: '120 ₾-დან / პერსონა',
    priceInfoEn: 'From 120 GEL / person',
    priceValue: 120,
    category: 'wine',
    shortDescription: 'სიყვარულის ქალაქი სიღნაღი, ბოდბის მონასტერი, ტრადიციული მარანი და ქვევრის ღვინის დეგუსტაცია.',
    shortDescriptionEn: 'The picturesque city of love Sighnaghi, Bodbe Monastery, traditional cellars, and UNESCO Qvevri wine tastings.',
    highlights: [
      'ბოდბის წმ. ნინოს მონასტერი',
      'სიღნაღის ძველი ციხე-გალავანი',
      'ტრადიციული კახური მარანი & დეგუსტაცია',
      'შოთის პურისა და ჩურჩხელის მასტერკლასი'
    ],
    highlightsEn: [
      'Bodbe St. Nino Monastery',
      'Sighnaghi Fortress & Great Wall Views',
      'Authentic Qvevri Wine Cellar & Tasting',
      'Georgian Bread & Churchkhela Masterclass'
    ],
    included: ['ტრანსპორტირება', 'გიდის თანხლება', 'ღვინის დეგუსტაცია'],
    includedEn: ['Private Transportation', 'Certified English Guide', 'Wine & Chacha Tastings'],
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    isActive: true
  },
  {
    id: 'martvili-prometheus',
    title: 'მარტვილის კანიონი & პრომეთეს მღვიმე',
    titleEn: 'Martvili Canyon & Prometheus Cave',
    region: 'სამეგრელო & იმერეთი',
    regionEn: 'Samegrelo & Imereti',
    duration: '1-2 დღე',
    durationEn: '1-2 Days',
    priceInfo: '160 ₾-დან / პერსონა',
    priceInfoEn: 'From 160 GEL / person',
    priceValue: 160,
    category: 'adventure',
    shortDescription: 'ნავით გასეირნება ზურმუხტისფერ მარტვილის კანიონში და პრომეთეს მღვიმის მიწისქვეშა დარბაზები.',
    shortDescriptionEn: 'Emerald boat ride in Martvili Canyon and the illuminated subterranean halls of Prometheus Cave.',
    highlights: [
      'მარტვილის კანიონი (ნავით გასეირნება)',
      'პრომეთეს მღვიმე (სტალაქტიტები & ნავით გასვლა)',
      'ოქაცეს კანიონის დაკიდული ბილიკი'
    ],
    highlightsEn: [
      'Martvili Canyon Boat Expedition',
      'Prometheus Cave Stalactites & Underground River',
      'Okatse Canyon Suspended Cliff Walkway'
    ],
    included: ['ტრანსპორტი', 'მძღოლი-გიდი', 'ბოთლის წყალი'],
    includedEn: ['Comfortable Vehicle', 'English-speaking Driver Guide', 'Bottled Spring Water'],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    isActive: true
  },
  {
    id: 'svaneti-mestia-ushguli',
    title: 'სვანეთი: მესტია & უშგული',
    titleEn: 'Svaneti: Mestia & Highest Village Ushguli',
    region: 'სვანეთი',
    regionEn: 'Svaneti',
    duration: '3-4 დღე',
    durationEn: '3-4 Days',
    priceInfo: '450 ₾-დან / პერსონა',
    priceInfoEn: 'From 450 GEL / person',
    priceValue: 450,
    category: 'multi_day',
    shortDescription: 'ევროპის ყველაზე მაღალი დასახლებული პუნქტი უშგული, შხარა, სვანური კოშკები და ენგურჰესი.',
    shortDescriptionEn: 'UNESCO World Heritage medieval defense towers, Mount Shkhara glacier, and Europe’s highest inhabited village.',
    highlights: [
      'ენგურის თაღოვანი კაშხალი',
      'მესტიის ეთნოგრაფიული მუზეუმი & კოშკები',
      'უშგული და ლამარიას ტაძარი',
      'შხარას მყინვარი (4x4 ტური)'
    ],
    highlightsEn: [
      'Enguri Arch Hydro Dam Reservoir',
      'Mestia Svan Defense Towers & Museum',
      'Ushguli Medieval Hamlet & Lamaria Church',
      'Shkhara Glacier Off-road 4x4 Expedition'
    ],
    included: ['4x4 ტრანსპორტი', 'გიდი', 'სასტუმროს შერჩევაში დახმარება'],
    includedEn: ['4x4 Off-road Vehicle & Fuel', 'Certified Mountain Guide', 'Boutique Hotel Planning Support'],
    imageUrl: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    isActive: true
  },
  {
    id: 'tbilisi-mtskheta-cultural',
    title: 'თბილისი & ძველი მცხეთა',
    titleEn: 'Tbilisi Old Town & Ancient Mtskheta',
    region: 'თბილისი & მცხეთა',
    regionEn: 'Tbilisi & Mtskheta',
    duration: '1 დღე (6-7 სთ)',
    durationEn: '1 Day (6-7 hrs)',
    priceInfo: '90 ₾-დან / პერსონა',
    priceInfoEn: 'From 90 GEL / person',
    priceValue: 90,
    category: 'cultural',
    shortDescription: 'ძველი თბილისის გოგირდის აბანოები, ნარიყალა, ჯვრის მონასტერი და სვეტიცხოვლის ტაძარი.',
    shortDescriptionEn: 'Old Tbilisi sulfur bath quarter, Narikala Fortress cable car, Jvari Monastery, and Svetitskhoveli Cathedral.',
    highlights: [
      'ძველი თბილისი და აბანოთუბანი',
      'ნარიყალას ციხესიმაგრე (საბაგირო)',
      'ჯვრის მონასტერი (არაგვისა და მტკვრის შესართავი)',
      'სვეტიცხოვლის საკათედრო ტაძარი'
    ],
    highlightsEn: [
      'Old Tbilisi & Abanotubani Sulfur Baths',
      'Narikala Fortress Aerial Cable Car',
      '6th-century Jvari Monastery Overlook',
      'Svetitskhoveli UNESCO Cathedral'
    ],
    included: ['ტრანსპორტირება', 'სერტიფიცირებული გიდი'],
    includedEn: ['City Transport & Transfers', 'Certified English Historian Guide'],
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    isActive: true
  },
  {
    id: 'borjomi-rabati-vardzia',
    title: 'ბორჯომი, რაბათი & ვარძია',
    titleEn: 'Borjomi, Rabati Fortress & Vardzia Cave City',
    region: 'სამცხე-ჯავახეთი',
    regionEn: 'Samtskhe-Javakheti',
    duration: '1-2 დღე',
    durationEn: '1-2 Days',
    priceInfo: '170 ₾-დან / პერსონა',
    priceInfoEn: 'From 170 GEL / person',
    priceValue: 170,
    category: 'cultural',
    shortDescription: 'ბორჯომის მინერალური პარკი, რაბათის განახლებული ციხე და თამარ მეფის ეპოქის კლდეში ნაკვეთი ქალაქი ვარძია.',
    shortDescriptionEn: 'Borjomi mineral springs park, the majestic multicultural Rabati Castle, and Queen Tamar’s 12th-century Vardzia cave monastery.',
    highlights: [
      'ბორჯომის ცენტრალური პარკი & მინერალური წყალი',
      'ახალციხის (რაბათის) ციხე-კომპლექსი',
      'ვარძიის კლდეში ნაკვეთი სამონასტრო კომპლექსი'
    ],
    highlightsEn: [
      'Borjomi Central Mineral Springs Park',
      'Akhaltsikhe (Rabati) Castle & Gardens',
      'Vardzia 12th-century Rock-cut Cave City'
    ],
    included: ['კომფორტული ტრანსპორტი', 'მძღოლი-გიდი'],
    includedEn: ['Comfortable Vehicle & Driver-Guide', 'Mineral Water & Fuel'],
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    isActive: true
  }
];

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'service-airport-transfer',
    title: 'აეროპორტის ტრანსფერი',
    titleEn: 'Airport Transfer (Tbilisi, Kutaisi, Batumi)',
    category: 'transfer',
    priceInfo: '60 ₾-დან / რეისი',
    priceInfoEn: 'From 60 GEL / trip',
    shortDescription: 'დახვედრა და გაცილება თბილისის, ქუთაისისა და ბათუმის საერთაშორისო აეროპორტებში.',
    shortDescriptionEn: 'Reliable private airport pickup and drop-off service across Tbilisi (TBS), Kutaisi (KUT), and Batumi (BUS) airports.',
    features: [
      'დახვედრა აბრით (სახელი / ლოგო)',
      'ფრენის ონლაინ მონიტორინგი (დაგვიანების შემთხვევაში ლოდინი)',
      'კომფორტული კონდიცირებული ავტომობილები',
      'ბარგის განთავსებაში დახმარება'
    ],
    featuresEn: [
      'Nameboard greeting at arrivals hall',
      'Live flight tracking with free waiting time',
      'Modern, air-conditioned comfortable vehicles',
      'Luggage assistance and child seat on request'
    ],
    iconName: 'plane',
    isActive: true
  },
  {
    id: 'service-private-guide',
    title: 'პროფესიონალი ტურისტული გიდი',
    titleEn: 'Certified Private Tour Guide',
    category: 'guide',
    priceInfo: '150 ₾-დან / დღე',
    priceInfoEn: 'From 150 GEL / day',
    shortDescription: 'სერტიფიცირებული, მრავალენოვანი გიდის მომსახურება (ქართული, ინგლისური, რუსული).',
    shortDescriptionEn: 'Professional certified multilingual guides (English, Georgian, Russian) providing engaging cultural and historical immersion.',
    features: [
      'საქართველოს ისტორიისა და კულტურის სიღრმისეული ცოდნა',
      'მოქნილი და მორგებული მარშრუტები',
      'ადგილობრივი რესტორნებისა და ღირსშესანიშნაობების რეკომენდაციები'
    ],
    featuresEn: [
      'Deep expertise in Georgian history, art, and winemaking',
      'Flexible itineraries adjusted to your pace',
      'Authentic food, wine, and scenic viewpoint insider tips'
    ],
    iconName: 'user-check',
    isActive: true
  },
  {
    id: 'service-vehicle-rent',
    title: 'ავტომობილის ქირაობა მძღოლით',
    titleEn: 'Private Vehicle Hire with Chauffeur',
    category: 'vehicle',
    priceInfo: '200 ₾-დან / დღე',
    priceInfoEn: 'From 200 GEL / day',
    shortDescription: 'კომფორტული სედანი, მინივენი ან 4x4 ჯიპი გამოცდილი მძღოლით მთელი საქართველოს მასშტაბით.',
    shortDescriptionEn: 'Sedans, spacious minivans (Mercedes Vito/V-Class), and rugged 4x4 SUVs with experienced local drivers.',
    features: [
      'გამოცდილი, უსაფრთხო მძღოლები',
      'სუფთა და ტექნიკურად გამართული ავტოპარკი',
      'საწვავის და მარშრუტის მოქნილი პირობები'
    ],
    featuresEn: [
      'Professional licensed mountain and highway drivers',
      'Pristine, non-smoking, well-serviced fleet',
      'Transparent fuel and flexible stopping policy'
    ],
    iconName: 'car',
    isActive: true
  },
  {
    id: 'service-custom-itinerary',
    title: 'ინდივიდუალური მარშრუტის დაგეგმვა',
    titleEn: 'Tailor-Made Custom Itinerary Planning',
    category: 'custom',
    priceInfo: 'შეთანხმებით (უფასო კონსულტაცია)',
    priceInfoEn: 'Custom Quote (Free Consultation)',
    shortDescription: 'თქვენს ინტერესებსა და ბიუჯეტზე მორგებული პერსონალური სამოგზაურო გეგმის შედგენა.',
    shortDescriptionEn: 'Full trip planning tailored to your exact dates, interests, group dynamics, and preferred travel pace.',
    features: [
      'დღეების მიხედვით ოპტიმალური მარშრუტი',
      'სასტუმროებისა და ლოკაციების შერჩევა',
      '24/7 მხარდაჭერა მოგზაურობისას'
    ],
    featuresEn: [
      'Day-by-day optimized route and timing maps',
      'Handpicked boutique hotels, wineries, and guesthouses',
      '24/7 on-trip concierge assistance via WhatsApp'
    ],
    iconName: 'compass',
    isActive: true
  }
];

