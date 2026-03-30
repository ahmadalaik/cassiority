import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Heart,
  Menu,
  X,
  ChevronRight,
  Globe,
  Users,
  TrendingUp,
  Shield,
  Star,
  ArrowRight,
  Play,
  CheckCircle2,
  Droplets,
  BookOpen,
  Leaf,
  Stethoscope,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const HERO_IMG =
  "https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwdm9sdW50ZWVycyUyMGhlbHBpbmclMjBjb21tdW5pdHl8ZW58MXx8fHwxNzcyNzI5NzMyfDA&ixlib=rb-4.1.0&q=80&w=1080";

const CAMPAIGNS = [
  {
    id: 1,
    title: "Education for Every Child",
    category: "Education",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
    raised: 48500,
    goal: 75000,
    donors: 342,
    daysLeft: 18,
    image:
      "https://images.unsplash.com/photo-1770843093640-c44ae557928b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMHNjaG9vbCUyMGFmcmljYXxlbnwxfHx8fDE3NzI3ODA3MTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Help us provide quality education to underprivileged children across rural communities.",
  },
  {
    id: 2,
    title: "Clean Water Initiative",
    category: "Water",
    icon: Droplets,
    color: "bg-cyan-100 text-cyan-600",
    raised: 92300,
    goal: 120000,
    donors: 789,
    daysLeft: 7,
    image:
      "https://images.unsplash.com/photo-1524581855427-4f2d2026a0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwYWZyaWNhJTIwdmlsbGFnZXxlbnwxfHx8fDE3NzI3ODA3MTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Bringing safe, clean drinking water to villages that have gone without for decades.",
  },
  {
    id: 3,
    title: "Feed the Hungry",
    category: "Food",
    icon: Heart,
    color: "bg-orange-100 text-orange-600",
    raised: 31200,
    goal: 50000,
    donors: 215,
    daysLeft: 24,
    image:
      "https://images.unsplash.com/photo-1620191809417-deb98871c8b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBodW5nZXIlMjByZWxpZWZ8ZW58MXx8fHwxNzcyNzgwNzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Providing nutritious meals and food security to families facing extreme hunger.",
  },
  {
    id: 4,
    title: "Medical Care Access",
    category: "Health",
    icon: Stethoscope,
    color: "bg-red-100 text-red-600",
    raised: 67800,
    goal: 100000,
    donors: 543,
    daysLeft: 31,
    image:
      "https://images.unsplash.com/photo-1576085898384-b3cdb88736e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBudXJzZSUyMG1lZGljYWwlMjBjbGluaWN8ZW58MXx8fHwxNzcyNzgwNzIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Funding mobile clinics and essential medicines for remote communities with no healthcare.",
  },
  {
    id: 5,
    title: "Reforestation Project",
    category: "Environment",
    icon: Leaf,
    color: "bg-green-100 text-green-600",
    raised: 28900,
    goal: 60000,
    donors: 178,
    daysLeft: 45,
    image:
      "https://images.unsplash.com/photo-1710361006404-a13d01802ce9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBlbnZpcm9ubWVudCUyMHRyZWUlMjBwbGFudGluZ3xlbnwxfHx8fDE3NzI3ODA3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Planting 1 million trees to restore ecosystems and combat climate change globally.",
  },
  {
    id: 6,
    title: "Women Empowerment",
    category: "Equality",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
    raised: 54100,
    goal: 80000,
    donors: 421,
    daysLeft: 12,
    image:
      "https://images.unsplash.com/photo-1607756196359-bfe2f3a335b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHNtaWxpbmclMjB3b21hbiUyMHZvbHVudGVlcnxlbnwxfHx8fDE3NzI3ODA3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Empowering women through skills training, microloans, and entrepreneurship support.",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Regular Donor",
    avatar: "SM",
    rating: 5,
    text: "HopeGive has completely changed how I think about charity. The transparency in how funds are used and the real impact stories make me confident every dollar counts.",
  },
  {
    id: 2,
    name: "James Okafor",
    role: "Campaign Beneficiary",
    avatar: "JO",
    rating: 5,
    text: "Thanks to the Clean Water Initiative campaign, our village now has access to safe drinking water. This has changed our lives completely — children no longer fall sick.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Corporate Partner",
    avatar: "ER",
    rating: 5,
    text: "We've partnered with HopeGive for two years. Their professionalism, impact tracking, and community-first approach make them the best charity platform we've worked with.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose a Cause",
    description:
      "Browse verified campaigns across education, health, water, food, and environment categories.",
    icon: Globe,
  },
  {
    step: "02",
    title: "Make a Donation",
    description:
      "Donate securely with any payment method. Set up one-time or recurring contributions.",
    icon: Heart,
  },
  {
    step: "03",
    title: "Track Your Impact",
    description:
      "Receive real-time updates, photos, and stories showing exactly how your donation helps.",
    icon: TrendingUp,
  },
];

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function AnimatedStat({
  value,
  label,
  prefix = "",
  suffix = "",
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 2000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  );
}

export default function LandingPageDraft() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Hope<span className="text-emerald-600">Give</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {["Campaigns", "How It Works", "About", "Blog"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className={`text-sm transition-colors hover:text-emerald-600 ${scrolled ? "text-gray-700" : "text-gray-800"}`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-emerald-600"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Donate Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {["Campaigns", "How It Works", "About", "Blog"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="block text-gray-700 py-2 hover:text-emerald-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Separator />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Donate Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-gray-900/85 via-gray-900/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-emerald-600/20 text-emerald-300 border-emerald-600/30 hover:bg-emerald-600/30">
              🌍 Making a Global Difference
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Together We Can <span className="text-emerald-400">Change</span> Lives Forever
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Join thousands of compassionate donors supporting verified campaigns across
              education, healthcare, water, food, and the environment. Every dollar creates
              real, lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
              >
                Start Donating <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white/10 hover:text-white gap-2"
              >
                <Play className="w-4 h-4" /> Watch Our Story
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "$4.2M", label: "Total Raised" },
                { value: "12K+", label: "Donors" },
                { value: "98%", label: "Transparency" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-linear-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-200">
              Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Numbers That Speak Volumes
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Real metrics from verified campaigns showing exactly how your donations create
              measurable change.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedStat value={4200000} label="Total Funds Raised" prefix="$" />
            <AnimatedStat value={12480} label="Active Donors" />
            <AnimatedStat value={89} label="Verified Campaigns" />
            <AnimatedStat value={156000} label="Lives Impacted" prefix="+" />
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section id="campaigns" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-200">
                Active Campaigns
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Make a Difference Today
              </h2>
              <p className="text-gray-500 mt-2">
                Every campaign is verified, transparent, and impactful.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 shrink-0"
            >
              View All Campaigns <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMPAIGNS.map((campaign) => {
              const pct = Math.round((campaign.raised / campaign.goal) * 100);
              return (
                <Card
                  key={campaign.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`${campaign.color} border-0 text-xs`}>
                        <campaign.icon className="w-3 h-3 mr-1" />
                        {campaign.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full px-2 py-1 text-xs font-medium text-red-600">
                      {campaign.daysLeft}d left
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {campaign.description}
                    </p>
                    <Progress value={pct} className="h-2 mb-3 [&>div]:bg-emerald-500" />
                    <div className="flex justify-between text-sm mb-4">
                      <div>
                        <span className="font-semibold text-gray-900">
                          ${campaign.raised.toLocaleString()}
                        </span>
                        <span className="text-gray-400"> raised</span>
                      </div>
                      <div className="text-emerald-600 font-medium">{pct}%</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Users className="w-3.5 h-3.5" />
                        {campaign.donors} donors
                      </div>
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Donate <Heart className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-200">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How HopeGive Works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Donating is simple, safe, and transparent. Here's how your generosity makes an
              impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div
              className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-linear-to-r from-emerald-200 to-emerald-400"
              style={{ left: "20%", right: "20%" }}
            />
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center text-center group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${i === 0 ? "bg-emerald-100 text-emerald-600" : i === 1 ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"}`}
                >
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "100% Secure",
                  desc: "All transactions are encrypted and secured with bank-level security.",
                },
                {
                  icon: CheckCircle2,
                  title: "Verified Campaigns",
                  desc: "Every campaign is thoroughly vetted by our expert review team.",
                },
                {
                  icon: TrendingUp,
                  title: "Real-Time Tracking",
                  desc: "Track your donation impact through live updates and detailed reports.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-200">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Voices of Change
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Real stories from donors, beneficiaries, and partners who've experienced the
              HopeGive difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-6 hover:shadow-lg transition-shadow border border-gray-100"
              >
                <CardContent className="p-0">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-400 text-xs">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-linear-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Join 12,000+ donors already changing lives around the world. Every contribution, no
            matter the size, creates ripples of hope.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8"
            >
              Start Donating Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Stay in the Loop</h2>
          <p className="text-gray-400 mb-6">
            Get weekly updates on campaigns, impact stories, and ways to help. No spam, ever.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 flex-1"
                required
              />
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
              >
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                <span className="text-white font-bold">
                  Hope<span className="text-emerald-400">Give</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                A transparent, impact-driven charity platform connecting compassionate donors
                with verified campaigns worldwide.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {[
              {
                title: "Quick Links",
                links: ["Home", "Campaigns", "How It Works", "About Us", "Blog"],
              },
              {
                title: "Support",
                links: [
                  "Help Center",
                  "Contact Us",
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-semibold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-emerald-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                {[
                  { icon: MapPin, text: "123 Hope Street, New York, NY 10001" },
                  { icon: Mail, text: "hello@hopegive.org" },
                  { icon: Phone, text: "+1 (555) 234-5678" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-2 text-sm">
                    <item.icon className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-800 mb-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
            <p>
              © 2026 HopeGive. All rights reserved. Making the world a better place, one
              donation at a time.
            </p>
            <p className="text-emerald-500">Registered Nonprofit Organization</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
