import { Language } from '../types';

export interface FaqItem {
  id: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  category: 'general' | 'booking' | 'transfer' | 'payment';
}

export interface TravelGuide {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  readTime: string;
  readTimeEn: string;
  category: string;
  categoryEn: string;
  imageUrl: string;
  summary: string;
  summaryEn: string;
  content: string[];
  contentEn: string[];
  tips: string[];
  tipsEn: string[];
  recommendedTourId?: string;
}

export const SEO_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'როგორ ხდება ტურის ან ტრანსფერის დაჯავშნა?',
    questionEn: 'How can I book a tour or airport transfer?',
    answer: 'დაჯავშნა არის უმარტივესი: შეგიძლიათ დაგვიკავშირდეთ პირდაპირ WhatsApp-ში (+995 555 12 34 56) ან შეავსოთ საიტზე განთავსებული სწრაფი ფორმა. ჩვენ მყისიერად დავაზუსტებთ თარიღს, ადამიანების რაოდენობას და დავადასტურებთ თქვენს ჯავშანს წინასწარი რთული ბიუროკრატიის გარეშე.',
    answerEn: 'Booking is simple and fast: you can message us directly on WhatsApp (+995 555 12 34 56) or fill out the quick inquiry form on our website. We will confirm dates, group size, and itinerary details immediately without complicated procedures.',
    category: 'booking'
  },
  {
    id: 'faq-2',
    question: 'ხვდებით თუ არა ტურისტებს ქუთაისის, თბილისისა და ბათუმის აეროპორტებში?',
    questionEn: 'Do you provide airport pickups in Kutaisi, Tbilisi, and Batumi?',
    answer: 'დიახ, ჩვენ ვუზრუნველყოფთ 24/7 კერძო ტრანსფერებს საქართველოს ყველა საერთაშორისო აეროპორტიდან (ქუთაისი KUT, თბილისი TBS, ბათუმი BUS). მძღოლი დაგხვდებათ ჩამოფრენის დარბაზში პერსონალური აბრით, დაგეხმარებათ ბარგთან და ფრენის დაგვიანების შემთხვევაშიც დაგელოდებათ უფასოდ.',
    answerEn: 'Yes, we provide 24/7 private airport transfer services across all international airports in Georgia (Kutaisi KUT, Tbilisi TBS, Batumi BUS). Your driver will meet you inside the arrivals hall with a name sign, assist with luggage, and monitor flight delays with complimentary waiting time.',
    category: 'transfer'
  },
  {
    id: 'faq-3',
    question: 'შესაძლებელია თუ არა ტურის მარშრუტისა და განრიგის ინდივიდუალურად მორგება?',
    questionEn: 'Can we customize the tour itinerary and departure time?',
    answer: 'რა თქმა უნდა! ყველა ჩვენი ტური არის 100%-ით მოქნილი და მორგებული თქვენს სურვილებზე. შეგიძლიათ შეცვალოთ გასვლის დრო, დაამატოთ ლოკაციები, გაჩერდეთ ფოტოებისთვის თქვენთვის სასურველ ადგილას და შეარჩიოთ საუკეთესო რესტორანი.',
    answerEn: 'Absolutely! All our tours are 100% private and customizable to your schedule and preferences. You can adjust departure times, add intermediate stops, take scenic photo breaks, and choose where to dine along the route.',
    category: 'general'
  },
  {
    id: 'faq-4',
    question: 'რა ენებზე საუბრობენ მძღოლები და გიდები?',
    questionEn: 'What languages do your drivers and guides speak?',
    answer: 'ჩვენი გუნდი დაკომპლექტებულია ინგლისურენოვანი, რუსულენოვანი და ქართულენოვანი პროფესიონალი მძღოლებითა და სერტიფიცირებული გიდებით, რომლებიც იდეალურად იცნობენ საქართველოს ისტორიასა და საუკეთესო ლოკაციებს.',
    answerEn: 'Our team consists of experienced, English-speaking, Russian-speaking, and Georgian guides and drivers who possess deep knowledge of Georgia’s history, cultural heritage, and scenic hidden gems.',
    category: 'general'
  },
  {
    id: 'faq-5',
    question: 'როგორ ხდება ანგარიშსწორება და ფასების გადახდა?',
    questionEn: 'What payment methods do you accept?',
    answer: 'ანგარიშსწორება შესაძლებელია როგორც ნაღდი ანგარიშსწორებით (GEL, USD, EUR) ტურის დღეს, ასევე საბანკო გადარიცხვით. საიტზე მითითებული ფასები არის გამჭვირვალე და არ შეიცავს დამალულ გადასახადებს.',
    answerEn: 'Payment can be made in cash (GEL, USD, EUR) on the day of the tour or via bank transfer. All quoted prices are completely transparent with no hidden booking fees.',
    category: 'payment'
  },
  {
    id: 'faq-6',
    question: 'როგორი ავტომობილები ემსახურება ტურებს?',
    questionEn: 'What types of vehicles are used for private tours and transfers?',
    answer: 'ჩვენ ვთავაზობთ სუფთა, ტექნიკურად შემოწმებულ და კონდიცირებულ ავტომობილებს: კომფორტულ სედანებს (1-3 მგზავრი), მინივენებს (4-7 მგზავრი), მაღალი გამავლობის 4x4 ჯიპებს მთიანი რეგიონებისთვის (სვანეთი, ყაზბეგი) და მინიბუსებს დიდი ჯგუფებისთვის.',
    answerEn: 'We operate clean, modern, and air-conditioned vehicles: comfortable sedans (1-3 passengers), spacious minivans (4-7 passengers), off-road 4x4 SUVs for mountain regions (Svaneti, Kazbegi), and minibuses for larger traveling groups.',
    category: 'transfer'
  }
];

export const TRAVEL_GUIDES: TravelGuide[] = [
  {
    id: 'guide-kutaisi-airport',
    slug: 'kutaisi-airport-transfers-travel-guide',
    title: 'ქუთაისის აეროპორტის გზამკვლევი: ტრანსფერები თბილისში, ბათუმსა და იმერეთში',
    titleEn: 'Kutaisi Airport Complete Guide: Transfers to Tbilisi, Batumi & West Georgia',
    subtitle: 'ყველაფერი რაც უნდა იცოდეთ ქუთაისის საერთაშორისო აეროპორტში (KUT) ჩამოფრენის შემდეგ.',
    subtitleEn: 'Essential travel tips for landing at Kutaisi International Airport (KUT) with Wizz Air & international flights.',
    readTime: '4 წთ საკითხავი',
    readTimeEn: '4 min read',
    category: 'ტრანსფერი & რჩევები',
    categoryEn: 'Transfers & Tips',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    summary: 'ქუთაისის აეროპორტი (KUT) არის საქართველოს მთავარი ლოუკოსტ ჰაბი. გაიგეთ როგორ იმგზავროთ კომფორტულად ქუთაისიდან თბილისში, ბათუმსა და სვანეთში.',
    summaryEn: 'Kutaisi International Airport (KUT) is Georgia’s primary low-cost flight hub. Here is how to easily travel from Kutaisi to Tbilisi, Batumi, Martvili Canyon, and Svaneti.',
    content: [
      'ქუთაისის დავით აღმაშენებლის სახელობის საერთაშორისო აეროპორტი მდებარეობს ქალაქ ქუთაისიდან 20 კმ-ში. ის იდეალური საწყისი წერტილია დასავლეთ საქართველოსა და მთიანი რეგიონების აღმოსაჩენად.',
      'ქუთაისიდან თბილისამდე მანძილი არის დაახლოებით 230 კმ (3.5 - 4 საათი), ხოლო ბათუმამდე - 140 კმ (2 - 2.5 საათი). კერძო ტრანსფერი გაძლევთ საშუალებას გზად დაათვალიეროთ სურამის უღელტეხილი, უფლისციხე ან მარტვილის კანიონი.',
      'პირდაპირი კერძო მძღოლით მგზავრობა უზრუნველყოფს მაქსიმალურ კომფორტს, ფრენის დაგვიანებისას გარანტირებულ ლოდინს და სასტუმროს კართან პირდაპირ მიყვანას.'
    ],
    contentEn: [
      'Kutaisi David the Builder International Airport (KUT) is located approximately 20 km outside Kutaisi city center. It serves as the primary gateway for European travelers flying with Wizz Air.',
      'Distance from Kutaisi Airport to Tbilisi is around 230 km (3.5 - 4 hours via highway), while Batumi and the Black Sea coast are 140 km away (2 - 2.5 hours). Booking a private transfer allows you to combine your trip with stops at Martvili Canyon or Gelati Monastery.',
      'A private driver greeting you at the terminal eliminates taxi scams, ensures fixed pricing, and drops you off directly at your hotel doorway anywhere in Georgia.'
    ],
    tips: [
      'დაჯავშნეთ ტრანსფერი წინასწარ, რათა მძღოლი დაგხვდეთ აბრით ჩამოფრენისთანავე.',
      'თუ მიემგზავრებით სვანეთში, ქუთაისიდან გზა 2 საათით უფრო მოკლეა ვიდრე თბილისიდან.',
      'აეროპორტის სიახლოვეს შეგიძლიათ იმავე დღეს მოინახულოთ პრომეთეს მღვიმე და მარტვილის კანიონი.'
    ],
    tipsEn: [
      'Book your private airport transfer in advance so your driver greets you with a personalized name sign.',
      'If traveling to Svaneti (Mestia), Kutaisi is 2 hours closer than departing from Tbilisi.',
      'Combine your airport arrival with a scenic detour to Prometheus Cave or Martvili Canyon on the same day.'
    ],
    recommendedTourId: 'martvili-prometheus'
  },
  {
    id: 'guide-kazbegi-road-trip',
    slug: 'kazbegi-military-highway-day-trip-guide',
    title: 'ყაზბეგის სამხედრო გზა: ტოპ ლოკაციები და რჩევები ერთდღიანი ტურისთვის',
    titleEn: 'Kazbegi & Military Highway: Top Stops for the Ultimate Day Tour',
    subtitle: 'საქართველოს ყველაზე შთამბეჭდავი სამთო მარშრუტი ჟინვალიდან გერგეტის სამებამდე.',
    subtitleEn: 'Scenic viewpoints, medieval fortresses, and snow-capped peaks along the Georgian Military Highway.',
    readTime: '5 წთ საკითხავი',
    readTimeEn: '5 min read',
    category: 'სამთო ტური',
    categoryEn: 'Mountain Tour',
    imageUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
    summary: 'საქართველოს სამხედრო გზა მსოფლიოში ერთ-ერთი ულამაზესი სამთო ავტომაგისტრალია. გაიგეთ რა უნდა ნახოთ გზად ყაზბეგისკენ.',
    summaryEn: 'The Georgian Military Highway is renowned as one of the world’s most scenic mountain roads. Here are the essential stops from Zhinvali Reservoir to Gergeti Trinity Church.',
    content: [
      'ყაზბეგის 1-დღიანი ტური მოიცავს ჟინვალის ფირუზისფერ წყალსაცავს, მე-17 საუკუნის ანანურის ციხესიმაგრეს, თეთრი და შავი არაგვის შესართავს ფასანაურში და გუდაურის მეგობრობის პანორამულ მონუმენტს (2,200 მ).',
      'მთავარი კულმინაციაა სტეფანწმინდა და მე-14 საუკუნის გერგეტის სამების ეკლესია, რომელიც ზღვის დონიდან 2,170 მეტრზე, მყინვარწვერის (5,047 მ) დიდებული მწვერვალის ფონზე დგას.',
      'ფასანაური ითვლება ქართული ხინკლის სამშობლოდ — აუცილებლად დააგემოვნეთ ნამდვილი მთიულური ხინკალი ადგილობრივ რესტორანში.'
    ],
    contentEn: [
      'A Kazbegi day trip showcases the turquoise Zhinvali Reservoir, 17th-century Ananuri Fortress, confluence of the Black and White Aragvi rivers in Pasanauri, and the dramatic Gudauri Friendship Monument at 2,200m.',
      'The crown jewel is Stepantsminda and the 14th-century Gergeti Trinity Church, perched proudly at 2,170m altitude beneath the imposing peak of Mount Kazbek (5,047m).',
      'Pasanauri is famous as the historical birthplace of Georgian Khinkali dumplings — make sure to stop for a warm authentic lunch along the river.'
    ],
    tips: [
      'თან იქონიეთ თბილი მოსაცმელი — ყაზბეგსა და გუდაურში ტემპერატურა ყოველთვის 5-10 გრადუსით დაბალია.',
      'საუკეთესო ფოტოებისთვის გასვლა რეკომენდებულია დილის 09:00 საათზე.',
      'გერგეტის სამებამდე ასვლა შესაძლებელია კომფორტული გზით ან 4x4 ავტომობილით.'
    ],
    tipsEn: [
      'Bring a light jacket or windbreaker — temperatures at high altitudes in Kazbegi and Gudauri are cooler year-round.',
      'Departing at 09:00 AM avoids midday traffic and captures the clearest morning mountain lighting.',
      'The paved panoramic road leads directly up to Gergeti Church for effortless sightseeing.'
    ],
    recommendedTourId: 'kazbegi-gergeti'
  },
  {
    id: 'guide-driver-vs-rental',
    slug: 'private-driver-vs-car-rental-georgia',
    title: 'მძღოლით მომსახურება თუ მანქანის ქირაობა საქართველოში: რომელი სჯობს?',
    titleEn: 'Private Driver with Car vs Car Rental in Georgia: Which is Better?',
    subtitle: 'ფასების, გზების უსაფრთხოებისა და კომფორტის დეტალური შედარება მოგზაურებისთვის.',
    subtitleEn: 'Comprehensive cost, road safety, and comfort breakdown for first-time and returning travelers.',
    readTime: '3 წთ საკითხავი',
    readTimeEn: '3 min read',
    category: 'გზამკვლევი',
    categoryEn: 'Travel Guide',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    summary: 'საქართველოში მოგზაურობისას ბევრი ტურისტი დგება არჩევანის წინაშე: იქირაოს მანქანა თუ აიყვანოს პირადი მძღოლი. აი მთავარი უპირატესობები.',
    summaryEn: 'Should you rent a self-drive car or hire a local private driver in Georgia? Discover why hiring a private driver often saves money, stress, and time.',
    content: [
      'საქართველოს სამთო გზები, სერპანტინები და ადგილობრივი მართვის სტილი ხშირად გამოწვევაა უცხოელი მძღოლებისთვის. მანქანის დაქირავებისას დამატებით იხდით დეპოზიტს, საწვავს, დაზღვევას და პასუხისმგებელი ხართ ნებისმიერ ნაკაწრზე.',
      'პირადი ადგილობრივი მძღოლის აყვანისას თქვენ თავისუფლდებით საჭესთან დაძაბულობისგან, შეგიძლიათ დააგემოვნოთ განთქმული ქართული ღვინო ნებისმიერ გაჩერებაზე და ისარგებლოთ ადგილობრივი გიდის რჩევებით.',
      'ფასის მხრივ, მცირე ჯგუფებისთვის (2-6 ადამიანი) პირადი მძღოლით ტური ხშირად უფრო ეკონომიური გამოდის, ვიდრე ავტომობილის ქირაობა საწვავისა და სრული დაზღვევის ჩათვლით.'
    ],
    contentEn: [
      'Mountain serpentines, livestock on country roads, and unique local driving styles can make self-driving stressful for foreign visitors. Rental cars also require large credit card deposits and expensive comprehensive insurance policies.',
      'Hiring a professional private driver frees you from navigation stress, allows you to enjoy Georgia’s legendary wine tastings freely, and provides insider access to authentic family wineries and scenic photo viewpoints.',
      'For couples and small groups (2-6 people), a private driver with vehicle is frequently more cost-effective and 100% stress-free compared to daily rental fees, fuel, and parking.'
    ],
    tips: [
      'თუ გეგმავთ ღვინის ტურს კახეთში, პირადი მძღოლი აუცილებლობაა დეგუსტაციებით სრულად დასატკბობად.',
      'სვანეთისა და ყაზბეგისთვის შეარჩიეთ 4x4 ავტომობილი ადგილობრივ გამოცდილ მძღოლთან ერთად.'
    ],
    tipsEn: [
      'For Kakheti wine region trips, a private driver is essential to enjoy cellar tastings without driving worries.',
      'For high mountain regions like Svaneti and Ushguli, experienced 4x4 drivers ensure safe navigation on rugged terrain.'
    ],
    recommendedTourId: 'kakheti-wine-tour'
  }
];
