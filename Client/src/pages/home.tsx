import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { 
  Rocket, 
  Satellite, 
  Settings, 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Instagram,
  Menu,
  X,
  ChevronDown,
  Search,
  Zap,
  Globe,
  Target,
  Award,
  Users,
  Clock
} from "lucide-react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const services = [
  {
    icon: Rocket,
    title: "Rocket Design",
    description: "Custom rocket design and development tailored to specific mission requirements and payload specifications.",
  },
  {
    icon: Satellite,
    title: "Propulsion Systems",
    description: "Advanced propulsion technology development including liquid, solid, and hybrid rocket engines.",
  },
  {
    icon: Shield,
    title: "Mission Control",
    description: "Complete mission control systems with real-time monitoring and autonomous flight control capabilities.",
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Space technology control room with multiple monitors",
    title: "Mission Control Center"
  },
  {
    src: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Rocket launch with flames and smoke",
    title: "Rocket Launch"
  },
  {
    src: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Satellite orbiting Earth with solar panels extended",
    title: "Satellite Deployment"
  },
  {
    src: "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Rocket engine testing facility with advanced engineering equipment",
    title: "Engineering Facility"
  },
  {
    src: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Earth from space with stunning blue atmosphere view",
    title: "Earth Orbit Mission"
  },
  {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Rocket launch at night with bright flames illuminating the darkness",
    title: "Night Launch"
  },
];

const stats = [
  { value: "247", label: "Successful Launches" },
  { value: "99.7%", label: "Success Rate" },
  { value: "15+", label: "Years Experience" },
  { value: "150+", label: "Engineers" },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [countdown, setCountdown] = useState(10);
  const [isLaunching, setIsLaunching] = useState(false);
  const [showLaunchEffect, setShowLaunchEffect] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      projectType: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContact) => apiRequest("POST", "/api/contacts", data),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const startLaunchSequence = () => {
    if (isLaunching) return;
    
    setIsLaunching(true);
    setCountdown(10);
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowLaunchEffect(true);
          toast({
            title: "🚀 Launch Successful!",
            description: "Mission parameters nominal. All systems go!",
          });
          
          setTimeout(() => {
            setIsLaunching(false);
            setShowLaunchEffect(false);
            setCountdown(10);
          }, 3000);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1));
      const scrollPos = window.scrollY + 100;

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;
          
          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-red-600/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection("home")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
            >
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full animate-pulse"></div>
                <Rocket className="absolute inset-0 m-auto text-white text-lg transform rotate-45" size={20} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
                Astrellion Tech
              </span>
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href.slice(1))}
                  className={`hover:text-red-600 transition-colors duration-300 relative group ${
                    activeSection === item.href.slice(1) ? "text-red-600" : ""
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:text-red-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href.slice(1))}
                    className="hover:text-red-600 transition-colors duration-300 text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 1,
              }}
            />
          ))}
        </div>
        
        {/* Constellation Background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="constellation"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        
        {/* Shooting Stars */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={`shooting-${i}`}
              className="shooting-star"
              style={{
                top: `${Math.random() * 50}%`,
                animationDelay: `${i * 2 + Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Space Debris */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={`debris-${i}`}
              className="space-debris"
              style={{
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
        
        {/* Planets */}
        <div className="absolute top-20 right-10 w-16 h-16 planet opacity-20"></div>
        <div className="absolute bottom-32 left-16 w-12 h-12 planet opacity-15"></div>
        
        {/* Orbital elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="orbital-element"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: `${100 + i * 20}px center`,
              }}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-300 to-red-600 bg-clip-text text-transparent"
            style={{ y: y1 }}
          >
            Astrellion Tech
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-4xl font-light mb-8 text-gray-200"
            style={{ y: y2 }}
          >
            Pioneering Rocket Engineering Excellence
          </motion.h2>
          <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pushing the boundaries of aerospace technology with cutting-edge rocket engineering solutions. 
            From concept to launch, we deliver precision-engineered systems that reach beyond the stars.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold hover-lift"
              onClick={() => scrollToSection("services")}
            >
              <Rocket className="mr-3" size={20} />
              Explore Our Technology
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              onClick={() => scrollToSection("gallery")}
            >
              <Search className="mr-3" size={20} />
              View Mission Gallery
            </Button>
          </div>
          
          {/* Interactive Launch Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex flex-col items-center"
          >
            <div className="relative">
              <div className="bg-black/80 backdrop-blur-md border border-red-600/30 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-semibold mb-4 text-red-400">Mission Control</h3>
                {isLaunching ? (
                  <div className="space-y-4">
                    {countdown > 0 ? (
                      <>
                        <div className="text-6xl font-bold text-white mb-2">{countdown}</div>
                        <p className="text-red-400">Launch sequence initiated...</p>
                      </>
                    ) : (
                      <div className="text-2xl font-bold text-green-400">LIFTOFF! 🚀</div>
                    )}
                  </div>
                ) : (
                  <Button
                    onClick={startLaunchSequence}
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold px-6 py-3"
                    disabled={isLaunching}
                  >
                    <Zap className="mr-2" size={20} />
                    Initiate Launch Sequence
                  </Button>
                )}
              </div>
              {showLaunchEffect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 2 }}
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button
            onClick={() => scrollToSection("about")}
            className="text-white hover:text-red-600 transition-colors duration-300"
          >
            <ChevronDown size={32} />
          </button>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent">
              About Astrellion Tech
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leading the aerospace revolution with innovative rocket engineering solutions and advanced propulsion technologies.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  icon: Satellite,
                  title: "Advanced Propulsion",
                  description: "Cutting-edge rocket engine technology with superior thrust-to-weight ratios and fuel efficiency."
                },
                {
                  icon: Settings,
                  title: "Precision Engineering",
                  description: "State-of-the-art manufacturing processes ensuring the highest quality and reliability standards."
                },
                {
                  icon: Shield,
                  title: "Mission Success",
                  description: "Proven track record of successful launches and space missions with 99.7% reliability rate."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                className="rounded-2xl shadow-2xl w-full h-auto hover-lift"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statistics Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 nebula-bg"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent">
              Mission Statistics
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Proven excellence in aerospace engineering and space exploration
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-black/50 backdrop-blur-sm border border-red-600/20 rounded-2xl p-6 hover:border-red-600/50 transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-red-600 mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-gray-300 font-medium">{stat.label}</p>
                  <div className="mt-3 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: index * 0.3 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-red-600 to-red-500"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={`service-star-${i}`}
              className="constellation"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive rocket engineering solutions from design to deployment
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/50 backdrop-blur-sm border border-red-600/20 hover:border-red-600/50 transition-all duration-300 hover-lift group">
                  <CardContent className="p-8">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <service.icon className="text-white text-2xl" size={32} />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent">
              Mission Gallery
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our latest achievements in space technology and rocket engineering
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-2xl hover-lift"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <Search className="text-white text-2xl mb-2 mx-auto" />
                    <p className="text-white font-semibold">{image.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-red-600 mb-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-300 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent">
              Launch Your Project
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to reach for the stars? Contact our team of rocket engineering experts today.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/50 backdrop-blur-sm border border-red-600/20">
                <CardContent className="p-8">
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-gray-300">First Name</Label>
                        <Input
                          {...form.register("firstName")}
                          className="bg-black border-gray-600 text-white focus:border-red-600"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300">Last Name</Label>
                        <Input
                          {...form.register("lastName")}
                          className="bg-black border-gray-600 text-white focus:border-red-600"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-300">Email</Label>
                      <Input
                        {...form.register("email")}
                        type="email"
                        className="bg-black border-gray-600 text-white focus:border-red-600"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Project Type</Label>
                      <Select onValueChange={(value) => form.setValue("projectType", value)}>
                        <SelectTrigger className="bg-black border-gray-600 text-white focus:border-red-600">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rocket-design">Rocket Design</SelectItem>
                          <SelectItem value="propulsion-systems">Propulsion Systems</SelectItem>
                          <SelectItem value="mission-control">Mission Control</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Message</Label>
                      <Textarea
                        {...form.register("message")}
                        rows={5}
                        className="bg-black border-gray-600 text-white focus:border-red-600"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white hover-lift"
                    >
                      <Rocket className="mr-3" size={20} />
                      {contactMutation.isPending ? "Launching..." : "Launch Project"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                {
                  icon: MapPin,
                  title: "Headquarters",
                  content: "123 Aerospace Blvd, Cape Canaveral, FL 32920"
                },
                {
                  icon: Phone,
                  title: "Phone", 
                  content: "+1 (555) 123-SPACE"
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "contact@astrelliontech.com"
                }
              ].map((contact, index) => (
                <Card key={index} className="bg-black/50 backdrop-blur-sm border border-red-600/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center">
                        <contact.icon className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{contact.title}</h3>
                        <p className="text-gray-300">{contact.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="bg-black/50 backdrop-blur-sm border border-red-600/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Follow Our Missions</h3>
                  <div className="flex space-x-4">
                    {[Twitter, Linkedin, Youtube, Instagram].map((Icon, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center transition-transform duration-300"
                      >
                        <Icon className="text-white" size={20} />
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-red-600/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
                  <Rocket className="absolute inset-0 m-auto text-white transform rotate-45" size={16} />
                </div>
                <span className="text-xl font-bold text-white">Astrellion Tech</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Leading the future of aerospace technology with innovative rocket engineering solutions that push the boundaries of what's possible.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Linkedin, Youtube, Instagram].map((Icon, index) => (
                  <button
                    key={index}
                    className="text-gray-400 hover:text-red-600 transition-colors duration-300"
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                {["Rocket Design", "Propulsion Systems", "Mission Control", "Consultation"].map((service) => (
                  <li key={service}>
                    <button className="text-gray-300 hover:text-red-600 transition-colors duration-300">
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {[
                  { label: "About Us", action: () => scrollToSection("about") },
                  { label: "Careers", action: () => {} },
                  { label: "News", action: () => {} },
                  { label: "Contact", action: () => scrollToSection("contact") },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={item.action}
                      className="text-gray-300 hover:text-red-600 transition-colors duration-300"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-red-600/20 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Astrellion Tech. All rights reserved. Reaching beyond the stars.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
