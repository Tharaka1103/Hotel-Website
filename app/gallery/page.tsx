"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  X, 
  Heart, 
  Download, 
  Share2, 
  Waves, 
  Palmtree, 
  Car, 
  Utensils, 
  Grid, 
  Layers, 
  Play, 
  Instagram,
  Search,
  Info,
  ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Types for our gallery components
type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string[];
  featured?: boolean;
  width: number;
  height: number;
  location?: string;
  date?: string;
  photographer?: string;
};

type FilterCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type ViewMode = "grid" | "masonry" | "carousel";

// Function to create a parallax effect based on scroll
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// Main Gallery Page Component
export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("masonry");
  const [searchQuery, setSearchQuery] = useState("");
  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });
  
  const y = useParallax(scrollYProgress, 100);
  
  // Mock categories with icons
  const categories: FilterCategory[] = [
    { id: "all", name: "All Photos", icon: <Grid className="h-4 w-4" /> },
    { id: "beach", name: "Beach Views", icon: <Waves className="h-4 w-4" /> },
    { id: "resort", name: "Resort", icon: <Palmtree className="h-4 w-4" /> },
    { id: "food", name: "Dining", icon: <Utensils className="h-4 w-4" /> },
    { id: "activities", name: "Activities", icon: <Play className="h-4 w-4" /> },
    { id: "travel", name: "Travel", icon: <Car className="h-4 w-4" /> },
  ];
  
  // Mock gallery images from Unsplash with varying aspect ratios
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=1974&auto=format&fit=crop",
      alt: "Beach view with surf boards",
      category: ["beach", "activities"],
      featured: true,
      width: 1600,
      height: 1200,
      location: "Main Beach",
      date: "2023-05-15",
      photographer: "Sarah Johnson"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
      alt: "Ocean waves",
      category: ["beach"],
      width: 1600,
      height: 900,
      location: "Surf Point",
      photographer: "Michael Brown"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1611043714658-af3e56bc5299?q=80&w=2070&auto=format&fit=crop",
      alt: "Luxury resort bedroom",
      category: ["resort"],
      width: 1200,
      height: 1600, // Tall portrait
      location: "Deluxe Suite",
      photographer: "Emma Wilson"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
      alt: "Exotic food dish",
      category: ["food"],
      width: 1600,
      height: 1067,
      location: "Resort Restaurant",
      photographer: "Chef Daniel"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1535732820275-9ffd998cac22?q=80&w=1998&auto=format&fit=crop",
      alt: "Surf lesson",
      category: ["activities", "beach"],
      featured: true,
      width: 1600,
      height: 1067,
      location: "Training Bay",
      date: "2023-06-20",
      photographer: "John Wave"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
      alt: "Infinity pool view",
      category: ["resort"],
      width: 1600,
      height: 2400, // Very tall portrait
      location: "Rooftop Pool",
      photographer: "Lisa Park"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=2070&auto=format&fit=crop",
      alt: "Morning breakfast spread",
      category: ["food"],
      width: 1600,
      height: 1067,
      location: "Beach Cafe",
      photographer: "Chef Maria"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2070&auto=format&fit=crop",
      alt: "Safari jeep tour",
      category: ["activities", "travel"],
      width: 1600,
      height: 900, // Wide landscape
      location: "National Park",
      photographer: "Tom Explorer"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      alt: "Beach sunset",
      category: ["beach"],
      featured: true,
      width: 1600,
      height: 1067,
      location: "West Shore",
      date: "2023-07-12",
      photographer: "Amanda Sky"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop",
      alt: "Poolside lounging",
      category: ["resort"],
      width: 1600,
      height: 1067,
      location: "Main Pool",
      photographer: "Paul Relax"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1957&auto=format&fit=crop",
      alt: "Tropical cocktails",
      category: ["food"],
      width: 1200,
      height: 1800, // Tall portrait
      location: "Beach Bar",
      photographer: "Mike Mixer"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
      alt: "Aerial beach view",
      category: ["beach", "travel"],
      width: 1600,
      height: 900, // Wide landscape
      location: "North Coast",
      photographer: "Drone Master"
    }
  ];

  // Filter images based on category and search
  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = activeCategory === "all" || image.category.includes(activeCategory);
    const matchesSearch = searchQuery === "" || 
      image.alt.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (image.location && image.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  // Get featured images
  const featuredImages = galleryImages.filter(image => image.featured);
  
  // Handler for opening image modal
  const openImageModal = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };
  
  // Handler for closing image modal
  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto"; // Restore scrolling
  };
  
  // Improved Image Card Component for Masonry Layout
  const ImageCard = ({ image, index }: { image: GalleryImage, index: number }) => {
    const aspectRatio = image.width / image.height;
    
    // Determine size classes for masonry layout
    const getSizeClasses = () => {
      if (viewMode !== "masonry") return "";
      
      // For landscape images (wider than tall)
      if (aspectRatio > 1.5) return "col-span-2 sm:col-span-2";
      // For very wide panoramic images
      if (aspectRatio > 2) return "col-span-2 sm:col-span-3";
      // For very tall images
      if (aspectRatio < 0.7) return "row-span-2";
      // Default for square-ish images
      return "";
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.05,
          ease: "easeOut"
        }}
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" 
        }}
        onClick={() => openImageModal(image)}
        className={cn(
          "relative overflow-hidden rounded-lg cursor-pointer group",
          getSizeClasses()
        )}
      >
        <div className="w-full h-full" style={{ 
          paddingBottom: viewMode === "masonry" ? `${(image.height / image.width) * 100}%` : "100%",
          position: "relative" 
        }}>
          <Image 
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-0 left-0 p-3 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-full">
            <h3 className="text-base font-semibold truncate">{image.alt}</h3>
            {image.location && (
              <p className="text-xs opacity-90 flex items-center gap-1">
                <Info className="h-3 w-3" /> {image.location}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  };
  
  // Carousel Component
  const Carousel = () => {
    const [current, setCurrent] = useState(0);
    
    const goToNext = () => setCurrent((current + 1) % filteredImages.length);
    const goToPrev = () => setCurrent((current - 1 + filteredImages.length) % filteredImages.length);
    
    useEffect(() => {
      // Auto-advance the carousel every 5 seconds
      const timer = setInterval(goToNext, 5000);
      return () => clearInterval(timer);
    }, [current]);
    
    return (
      <div className="w-full relative overflow-hidden h-[70vh] bg-black/5 rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div 
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image 
              src={filteredImages[current].src}
              alt={filteredImages[current].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white text-2xl font-bold">{filteredImages[current].alt}</h2>
              <p className="text-white/80">{filteredImages[current].location}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <Button 
          onClick={goToPrev}
          size="icon" 
          variant="ghost" 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-md hover:bg-black/40 rounded-full h-12 w-12 text-white z-10"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <Button 
          onClick={goToNext}
          size="icon" 
          variant="ghost" 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 backdrop-blur-md hover:bg-black/40 rounded-full h-12 w-12 text-white z-10"
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {filteredImages.map((_, index) => (
            <Button 
              key={index}
              size="icon"
              variant="ghost"
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 p-0 rounded-full ${index === current ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    );
  };
  
  // Image modal for detailed view
  const ImageModal = () => {
    if (!selectedImage) return null;
    
    // Navigate to previous/next image
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    
    const goToPrevImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (currentIndex > 0) {
        setSelectedImage(filteredImages[currentIndex - 1]);
      } else {
        setSelectedImage(filteredImages[filteredImages.length - 1]);
      }
    };
    
    const goToNextImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (currentIndex < filteredImages.length - 1) {
        setSelectedImage(filteredImages[currentIndex + 1]);
      } else {
        setSelectedImage(filteredImages[0]);
      }
    };
    
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-10"
          onClick={closeImageModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-black/20 backdrop-blur-md hover:bg-black/40 rounded-full h-10 w-10 text-white"
            >
              <X className="h-5 w-5" />
            </Button>
            
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={goToPrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-md hover:bg-black/40 rounded-full h-12 w-12 text-white"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 backdrop-blur-md hover:bg-black/40 rounded-full h-12 w-12 text-white"
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
            
            <div className="relative h-[70vh] overflow-hidden">
              <Image 
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
            
            <div className="bg-white p-5 rounded-b-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{selectedImage.alt}</h2>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                    {selectedImage.location && (
                      <span className="flex items-center gap-1"><Info className="h-3 w-3" /> {selectedImage.location}</span>
                    )}
                    {selectedImage.date && (
                      <span>· {selectedImage.date}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedImage.category.map((cat) => (
                      <Badge key={cat} variant="secondary" className="capitalize text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {selectedImage.photographer && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-xs text-muted-foreground">
                    Photo by: <span className="font-medium">{selectedImage.photographer}</span>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background">
      {/* Hero Section */}
      <section className="relative h-screen sm:h-screen overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            className="w-full h-full"
            style={{ y }}
          >
            <Image 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" 
              alt="Gallery Hero" 
              fill 
              className="object-cover" 
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge 
                variant="outline" 
                className="border-primary bg-primary/10 backdrop-blur-md px-4 py-1 text-sm font-normal mb-4 text-white"
              >
                Unforgettable Moments
              </Badge>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg tracking-tight text-white"
              >
                Our <span className="text-primary">Gallery</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/90"
              >
                Explore our stunning collection of paradise moments
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="max-w-md mx-auto relative"
              >
                <Input 
                  type="text"
                  placeholder="Search photos, locations..."
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/60 h-10 pl-10 pr-4 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 cursor-pointer text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          onClick={() => galleryRef.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm">Explore Gallery</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Images Slider */}
      {featuredImages.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-black/70 to-transparent">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Featured Images</h2>
              <Link href="#all-photos">
                <Button variant="link" className="text-white">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <motion.div 
              className="flex gap-3 overflow-x-auto pb-4 no-scrollbar"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {featuredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative flex-shrink-0 w-[280px] sm:w-[320px] h-[200px] rounded-lg overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => openImageModal(image)}
                >
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 280px, 320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3 text-white">
                    <h3 className="text-base font-bold">{image.alt}</h3>
                    {image.location && <p className="text-xs opacity-80">{image.location}</p>}
                  </div>
                  <Badge className="absolute top-3 right-3 bg-primary text-xs">Featured</Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Gallery Section */}
      <section id="all-photos" ref={galleryRef} className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            {/* Categories filter */}
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-full",
                    activeCategory === category.id 
                      ? "bg-primary hover:bg-primary/90" 
                      : "hover:bg-primary/10"
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.icon}
                  <span className="ml-1">{category.name}</span>
                </Button>
              ))}
            </div>
            
            {/* View mode selector */}
            <div className="flex items-center gap-1 bg-muted rounded-full p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className={viewMode === "grid" ? "rounded-full bg-primary" : "rounded-full"}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4 mr-1" /> Grid
              </Button>
              <Button
                variant={viewMode === "masonry" ? "default" : "ghost"}
                size="sm"
                className={viewMode === "masonry" ? "rounded-full bg-primary" : "rounded-full"}
                onClick={() => setViewMode("masonry")}
              >
                <Layers className="h-4 w-4 mr-1" /> Masonry
              </Button>
              <Button
                variant={viewMode === "carousel" ? "default" : "ghost"}
                size="sm"
                className={viewMode === "carousel" ? "rounded-full bg-primary" : "rounded-full"}
                onClick={() => setViewMode("carousel")}
              >
                <Play className="h-4 w-4 mr-1" /> Slideshow
              </Button>
            </div>
          </div>
          
          {/* Dynamic Gallery Display based on view mode */}
          {viewMode === "carousel" ? (
            <Carousel />
          ) : viewMode === "masonry" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-auto">
              {filteredImages.map((image, index) => (
                <ImageCard key={image.id} image={image} index={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredImages.map((image, index) => (
                <ImageCard key={image.id} image={image} index={index} />
              ))}
            </div>
          )}
          
          {filteredImages.length === 0 && (
            <div className="text-center py-16 bg-muted/30 rounded-xl">
              <p className="text-lg text-muted-foreground">No images found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Instagram-style CTA */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Follow Our Adventures</h2>
              <p className="text-white/80 text-base max-w-xl">
                Stay updated with our latest photos and stories by following us on Instagram.
                Tag your photos with #RupasSurfResort to be featured!
              </p>
              <Button 
                className="mt-5 bg-white text-primary hover:bg-white/90 rounded-full"
              >
                <Instagram className="mr-2 h-4 w-4" />
                Follow @RupasSurfResort
              </Button>
            </div>
            
            <motion.div 
              className="grid grid-cols-3 gap-2 w-full max-w-sm"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {galleryImages.slice(0, 6).map((image, index) => (
                <motion.div
                  key={`insta-${index}`}
                  className="aspect-square rounded-lg overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal />
    </main>
  );
}
