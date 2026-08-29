import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Eye,
  EyeOff,
  BookOpen,
  Sparkles,
  Clock,
  Tag,
  ImageIcon,
  Upload,
  Globe,
  Languages,
  Compass,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { TravelGuide, Tour } from '../types';
import { compressImageFile, formatImageUrl } from '../utils/imageHelper';

interface AdminTravelGuidesTabProps {
  guides: TravelGuide[];
  tours: Tour[];
  onUpdateGuides: (guides: TravelGuide[]) => void;
  onShowToast: (msg: string) => void;
}

const PRESET_GUIDE_PHOTOS = [
  {
    name: 'ყაზბეგი & გერგეტი',
    url: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'ქუთაისის აეროპორტი & ტრანსფერი',
    url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'სვანეთი & კოშკები',
    url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'კახეთი & ღვინის გზა',
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'მარტვილის კანიონი & იმერეთი',
    url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'ბათუმი & შავი ზღვა',
    url: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80'
  }
];

export const AdminTravelGuidesTab: React.FC<AdminTravelGuidesTabProps> = ({
  guides,
  tours,
  onUpdateGuides,
  onShowToast
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [langTab, setLangTab] = useState<'both' | 'ka' | 'en'>('both');
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const [formData, setFormData] = useState<Partial<TravelGuide>>({
    title: '',
    titleEn: '',
    subtitle: '',
    subtitleEn: '',
    category: 'სამოგზაურო რჩევები',
    categoryEn: 'Travel Tips',
    readTime: '3 წთ წასაკითხი',
    readTimeEn: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
    summary: '',
    summaryEn: '',
    content: [],
    contentEn: [],
    tips: [],
    tipsEn: [],
    recommendedTourId: '',
    isActive: true
  });

  const [contentKaInput, setContentKaInput] = useState('');
  const [contentEnInput, setContentEnInput] = useState('');
  const [tipKaInput, setTipKaInput] = useState('');
  const [tipEnInput, setTipEnInput] = useState('');

  const handleStartAdd = () => {
    setFormData({
      title: '',
      titleEn: '',
      subtitle: '',
      subtitleEn: '',
      category: 'სამოგზაურო რჩევები',
      categoryEn: 'Travel Tips',
      readTime: '3 წთ წასაკითხი',
      readTimeEn: '3 min read',
      imageUrl: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
      summary: '',
      summaryEn: '',
      content: ['საქართველოს აღმოსაჩენად საუკეთესო დრო გაზაფხულიდან შემოდგომამდე პერიოდია.'],
      contentEn: ['The best time to discover Georgia is between late spring and early autumn.'],
      tips: ['თან იქონიეთ ნაღდი ფული რეგიონებში სამოგზაუროდ'],
      tipsEn: ['Carry local cash when traveling through mountainous regions'],
      recommendedTourId: tours.length > 0 ? tours[0].id : '',
      isActive: true
    });
    setContentKaInput('');
    setContentEnInput('');
    setTipKaInput('');
    setTipEnInput('');
    setIsEditing(true);
  };

  const handleStartEdit = (guide: TravelGuide) => {
    setFormData({
      ...guide,
      content: guide.content || [],
      contentEn: guide.contentEn || [],
      tips: guide.tips || [],
      tipsEn: guide.tipsEn || []
    });
    setContentKaInput('');
    setContentEnInput('');
    setTipKaInput('');
    setTipEnInput('');
    setIsEditing(true);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('ფაილის ზომა არ უნდა აღემატებოდეს 15MB-ს');
        return;
      }
      try {
        setIsUploadingImage(true);
        const compressed = await compressImageFile(file, 1400, 900, 0.85);
        setFormData((prev) => ({ ...prev, imageUrl: compressed }));
      } catch (err) {
        console.error('Error optimizing guide image:', err);
        const reader = new FileReader();
        reader.onload = (ev) => {
          const res = ev.target?.result as string;
          if (res) setFormData((prev) => ({ ...prev, imageUrl: res }));
        };
        reader.readAsDataURL(file);
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  // Add / Remove Content Paragraphs
  const handleAddContentKa = () => {
    if (!contentKaInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      content: [...(prev.content || []), contentKaInput.trim()]
    }));
    setContentKaInput('');
  };

  const handleRemoveContentKa = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      content: (prev.content || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddContentEn = () => {
    if (!contentEnInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      contentEn: [...(prev.contentEn || []), contentEnInput.trim()]
    }));
    setContentEnInput('');
  };

  const handleRemoveContentEn = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      contentEn: (prev.contentEn || []).filter((_, i) => i !== index)
    }));
  };

  // Add / Remove Tips
  const handleAddTipKa = () => {
    if (!tipKaInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      tips: [...(prev.tips || []), tipKaInput.trim()]
    }));
    setTipKaInput('');
  };

  const handleRemoveTipKa = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tips: (prev.tips || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddTipEn = () => {
    if (!tipEnInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      tipsEn: [...(prev.tipsEn || []), tipEnInput.trim()]
    }));
    setTipEnInput('');
  };

  const handleRemoveTipEn = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tipsEn: (prev.tipsEn || []).filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.title.trim()) {
      alert('გთხოვთ მიუთითოთ გზამკვლევის სათაური ქართულად');
      return;
    }

    const currentId = formData.id || 'guide-' + Date.now();
    const newGuide: TravelGuide = {
      id: currentId,
      title: formData.title.trim(),
      titleEn: formData.titleEn?.trim() || formData.title.trim(),
      subtitle: formData.subtitle?.trim() || '',
      subtitleEn: formData.subtitleEn?.trim() || '',
      category: formData.category?.trim() || 'სამოგზაურო რჩევები',
      categoryEn: formData.categoryEn?.trim() || 'Travel Tips',
      readTime: formData.readTime?.trim() || '3 წთ წასაკითხი',
      readTimeEn: formData.readTimeEn?.trim() || '3 min read',
      imageUrl: formData.imageUrl?.trim() || 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80',
      summary: formData.summary?.trim() || '',
      summaryEn: formData.summaryEn?.trim() || '',
      content: formData.content && formData.content.length > 0 ? formData.content : ['სტატიის ტექსტი...'],
      contentEn: formData.contentEn && formData.contentEn.length > 0 ? formData.contentEn : ['Article content...'],
      tips: formData.tips || [],
      tipsEn: formData.tipsEn || [],
      recommendedTourId: formData.recommendedTourId || undefined,
      isActive: formData.isActive ?? true
    };

    const exists = guides.some((g) => g.id === currentId);
    let updated: TravelGuide[];
    if (exists) {
      updated = guides.map((g) => (g.id === currentId ? newGuide : g));
      onShowToast(`გზამკვლევი "${newGuide.title}" განახლდა`);
    } else {
      updated = [newGuide, ...guides];
      onShowToast(`ახალი გზამკვლევი "${newGuide.title}" დაემატა`);
    }

    onUpdateGuides(updated);
    setIsEditing(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`ნამდვილად გსურთ გზამკვლევის "${title}" წაშლა?`)) {
      const updated = guides.filter((g) => g.id !== id);
      onUpdateGuides(updated);
      onShowToast('გზამკვლევი წაიშალა');
    }
  };

  const handleToggleActive = (id: string) => {
    const updated = guides.map((g) =>
      g.id === id ? { ...g, isActive: g.isActive === false ? true : false } : g
    );
    onUpdateGuides(updated);
  };

  return (
    <div className="space-y-6">
      {!isEditing ? (
        <>
          {/* Header & Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>სასარგებლო გზამკვლევების მართვა ({guides.length})</span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                შეცვალეთ ფოტოები, სათაურები, სტატიის ტექსტი და რჩევები ქართულად და ინგლისურად.
              </p>
            </div>
            <button
              onClick={handleStartAdd}
              id="btn-admin-add-guide"
              className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>ახალი გზამკვლევის დამატება</span>
            </button>
          </div>

          {/* Guides Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className={`bg-white rounded-2xl border p-4 flex flex-col justify-between shadow-xs transition-all ${
                  guide.isActive !== false ? 'border-stone-200' : 'border-stone-200 opacity-60 bg-stone-100/50'
                }`}
              >
                <div>
                  {/* Photo Preview Thumbnail */}
                  <div className="relative h-36 w-full rounded-xl overflow-hidden mb-3 bg-stone-100 border border-stone-200">
                    <img
                      src={formatImageUrl(guide.imageUrl)}
                      alt={guide.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Tag className="w-3 h-3 text-amber-400" />
                      <span>{guide.category}</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 text-stone-800 text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-500" />
                      <span>{guide.readTime}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-stone-900 leading-snug flex items-center gap-1.5 flex-wrap">
                      <span>🇬🇪 {guide.title}</span>
                    </h4>
                    {guide.titleEn && (
                      <p className="text-xs font-semibold text-stone-600 flex items-center gap-1.5">
                        <span>🇬🇧 {guide.titleEn}</span>
                      </p>
                    )}
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                      {guide.subtitle || guide.summary}
                    </p>
                  </div>

                  {/* Meta stats */}
                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-3 text-[11px] text-stone-500">
                    <span>📝 {guide.content?.length || 0} აბზაცი</span>
                    <span>💡 {guide.tips?.length || 0} რჩევა</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between gap-2 pt-4 mt-3 border-t border-stone-100">
                  <button
                    onClick={() => handleToggleActive(guide.id)}
                    title={guide.isActive !== false ? 'აქტიურია (საიტზე ჩანს)' : 'გამორთულია (საიტზე არ ჩანს)'}
                    className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      guide.isActive !== false
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {guide.isActive !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{guide.isActive !== false ? 'აქტიური' : 'გამორთული'}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleStartEdit(guide)}
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                      title="რედაქტირება"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(guide.id, guide.title)}
                      className="p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="წაშლა"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Edit / Add Guide Form */
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-5 border-b border-stone-100 mb-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                {formData.id ? 'რედაქტირება' : 'ახალი გზამკვლევი'}
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                {formData.id ? `"${formData.title}" - რედაქტირება` : 'ახალი გზამკვლევის შექმნა'}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Language Switcher Tabs */}
          <div className="flex items-center gap-2 mb-6 bg-stone-100 p-1.5 rounded-2xl w-fit">
            <button
              type="button"
              onClick={() => setLangTab('both')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                langTab === 'both' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-amber-500" />
              <span>ორივე ენა (🇬🇪 & 🇬🇧)</span>
            </button>
            <button
              type="button"
              onClick={() => setLangTab('ka')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                langTab === 'ka' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🇬🇪 ქართული</span>
            </button>
            <button
              type="button"
              onClick={() => setLangTab('en')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                langTab === 'en' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🇬🇧 English</span>
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* PHOTO SECTION */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900">
                <ImageIcon className="w-4 h-4 text-amber-500" />
                <span>გზამკვლევის მთავარი ფოტო</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ფოტოს პირდაპირი ბმული (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />

                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ან ატვირთეთ ფოტო კომპიუტერიდან / ტელეფონიდან
                    </label>
                    <label className="inline-flex items-center gap-2 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer shadow-xs transition-colors">
                      <Upload className="w-4 h-4 text-amber-500" />
                      <span>{isUploadingImage ? 'მუშავდება...' : 'ფოტოს არჩევა'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Preset Photos */}
                  <div className="mt-4">
                    <span className="block text-[11px] font-semibold text-stone-500 mb-1.5">
                      ან აირჩიეთ მზა მაღალი ხარისხის ფოტო:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_GUIDE_PHOTOS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            formData.imageUrl === preset.url
                              ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                              : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preview Box */}
                <div>
                  <span className="block text-xs font-semibold text-stone-700 mb-1">ფოტოს გადახედვა:</span>
                  <div className="relative h-44 w-full rounded-xl overflow-hidden border border-stone-300 bg-stone-200">
                    {formData.imageUrl ? (
                      <img
                        src={formatImageUrl(formData.imageUrl)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                        ფოტო არ არის მითითებული
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* TITLES & SUBTITLES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(langTab === 'both' || langTab === 'ka') && (
                <div className="space-y-4 bg-[#F9F7F2]/60 p-4 rounded-2xl border border-stone-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                    <span>🇬🇪 ქართული ვერსია</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      სათაური (სავალდებულო) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="მაგ: ქუთაისის აეროპორტის ტრანსფერი & რჩევები"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ქვესათაური / მოკლე სლოგანი
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle || ''}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="მაგ: როგორ დავგეგმოთ მგზავრობა მარტივად და უსაფრთხოდ"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      კატეგორია
                    </label>
                    <input
                      type="text"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="მაგ: ტრანსფერი & ლოჯისტიკა"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      კითხვის სავარაუდო დრო
                    </label>
                    <input
                      type="text"
                      value={formData.readTime || ''}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="მაგ: 3 წთ წასაკითხი"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      მოკლე აღწერა ბარათისთვის
                    </label>
                    <textarea
                      rows={2}
                      value={formData.summary || ''}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      placeholder="მაგ: პრაქტიკული რჩევები მგზავრობისთვის..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {(langTab === 'both' || langTab === 'en') && (
                <div className="space-y-4 bg-sky-50/40 p-4 rounded-2xl border border-sky-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                    <span>🇬🇧 English Version</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Title (English)
                    </label>
                    <input
                      type="text"
                      value={formData.titleEn || ''}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      placeholder="e.g. Kutaisi Airport Transfer & Travel Tips"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Subtitle / Tagline (English)
                    </label>
                    <input
                      type="text"
                      value={formData.subtitleEn || ''}
                      onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
                      placeholder="e.g. Everything you need to know about airport connections"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Category (English)
                    </label>
                    <input
                      type="text"
                      value={formData.categoryEn || ''}
                      onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                      placeholder="e.g. Airport Transfer & Logistics"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Read Time (English)
                    </label>
                    <input
                      type="text"
                      value={formData.readTimeEn || ''}
                      onChange={(e) => setFormData({ ...formData, readTimeEn: e.target.value })}
                      placeholder="e.g. 3 min read"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Summary for Card (English)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.summaryEn || ''}
                      onChange={(e) => setFormData({ ...formData, summaryEn: e.target.value })}
                      placeholder="e.g. Practical recommendations for arriving at Kutaisi Airport..."
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ARTICLE CONTENT PARAGRAPHS */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>სტატიის ტექსტის აბზაცები (Content Paragraphs)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Georgian Content Paragraphs */}
                {(langTab === 'both' || langTab === 'ka') && (
                  <div className="space-y-3">
                    <span className="block text-xs font-semibold text-stone-800">
                      🇬🇪 ქართული აბზაცები ({formData.content?.length || 0})
                    </span>
                    <div className="space-y-2">
                      {(formData.content || []).map((paragraph, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2 bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-800"
                        >
                          <p className="flex-1 leading-relaxed">{paragraph}</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveContentKa(idx)}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="აბზაცის წაშლა"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <textarea
                        rows={2}
                        value={contentKaInput}
                        onChange={(e) => setContentKaInput(e.target.value)}
                        placeholder="დაწერეთ ახალი აბზაცი ქართულად..."
                        className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddContentKa}
                        className="px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer self-end py-2.5"
                      >
                        დამატება
                      </button>
                    </div>
                  </div>
                )}

                {/* English Content Paragraphs */}
                {(langTab === 'both' || langTab === 'en') && (
                  <div className="space-y-3">
                    <span className="block text-xs font-semibold text-stone-800">
                      🇬🇧 English Paragraphs ({formData.contentEn?.length || 0})
                    </span>
                    <div className="space-y-2">
                      {(formData.contentEn || []).map((paragraph, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between gap-2 bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-800"
                        >
                          <p className="flex-1 leading-relaxed">{paragraph}</p>
                          <button
                            type="button"
                            onClick={() => handleRemoveContentEn(idx)}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Remove paragraph"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <textarea
                        rows={2}
                        value={contentEnInput}
                        onChange={(e) => setContentEnInput(e.target.value)}
                        placeholder="Type new paragraph in English..."
                        className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddContentEn}
                        className="px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer self-end py-2.5"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* LOCAL INSIDER TIPS (რჩევები) */}
            <div className="bg-amber-50/50 border border-amber-200/70 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>ადგილობრივი რჩევები & Lifehacks (Insider Tips)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Georgian Tips */}
                {(langTab === 'both' || langTab === 'ka') && (
                  <div className="space-y-3">
                    <span className="block text-xs font-semibold text-stone-800">
                      🇬🇪 ქართული რჩევები ({formData.tips?.length || 0})
                    </span>
                    <div className="space-y-2">
                      {(formData.tips || []).map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-stone-200 text-xs text-stone-800"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{tip}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveTipKa(idx)}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tipKaInput}
                        onChange={(e) => setTipKaInput(e.target.value)}
                        placeholder="მაგ: გადაიხადეთ ბარათით ან იქონიეთ ლარი..."
                        className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddTipKa}
                        className="px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        დამატება
                      </button>
                    </div>
                  </div>
                )}

                {/* English Tips */}
                {(langTab === 'both' || langTab === 'en') && (
                  <div className="space-y-3">
                    <span className="block text-xs font-semibold text-stone-800">
                      🇬🇧 English Tips ({formData.tipsEn?.length || 0})
                    </span>
                    <div className="space-y-2">
                      {(formData.tipsEn || []).map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-stone-200 text-xs text-stone-800"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{tip}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveTipEn(idx)}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tipEnInput}
                        onChange={(e) => setTipEnInput(e.target.value)}
                        placeholder="e.g. Always carry local currency for remote areas..."
                        className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={handleAddTipEn}
                        className="px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RECOMMENDED TOUR & ACTIVE TOGGLE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  დაკავშირებული რეკომენდებული ტური (არასავალდებულო)
                </label>
                <select
                  value={formData.recommendedTourId || ''}
                  onChange={(e) => setFormData({ ...formData, recommendedTourId: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">-- დაკავშირების გარეშე (ზოგადი მოთხოვნა) --</option>
                  {tours.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.region})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive !== false}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-stone-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  <span className="ml-2 text-xs font-semibold text-stone-800">
                    {formData.isActive !== false ? 'აქტიურია (საიტზე გამოჩნდება)' : 'გამორთულია (დამალულია)'}
                  </span>
                </label>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
              <button
                type="submit"
                id="btn-save-guide"
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>გზამკვლევის შენახვა</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                გაუქმება
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
