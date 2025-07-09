import { Button } from '@/components/ui/button'
import { Star, Quote, ExternalLink, Calendar, MapPin } from 'lucide-react'

const ReviewOfTheDay = () => {
  const review = {
    id: 1,
    place: "Riad Kniza",
    category: "Luxury Riad",
    rating: 5,
    title: "An absolutely magical experience in the heart of Marrakech",
    content: "This riad exceeded all our expectations. The attention to detail is incredible - from the beautiful traditional architecture to the modern amenities. The staff went above and beyond to make our stay memorable. The rooftop terrace offers stunning views of the Atlas Mountains, and the traditional Moroccan breakfast was a highlight every morning. The location is perfect, just steps away from the main souks but quiet enough for a peaceful night's sleep.",
    author: "Sarah M.",
    authorLocation: "London, UK",
    date: "2 days ago",
    platform: "TripAdvisor",
    verified: true,
    helpful: 24,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"
    ]
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="h-4 w-4" />
            <span>Review of the Day</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Today's Featured Review
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every day we highlight an exceptional review that captures the essence of Marrakech's hospitality.
          </p>
        </div>

        {/* Review Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 border-b border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{review.place}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="bg-muted px-2 py-1 rounded-full">{review.category}</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>Medina, Marrakech</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Text Content */}
                <div className="md:col-span-2">
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                    <h4 className="text-xl font-semibold text-foreground mb-3 pl-6">
                      {review.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed pl-6">
                      {review.content}
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{review.author}</p>
                        <p className="text-sm text-muted-foreground">{review.authorLocation}</p>
                      </div>
                      {review.verified && (
                        <span className="bg-accent/10 text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{review.helpful} found helpful</span>
                      <span>•</span>
                      <span>{review.platform}</span>
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-3">
                  {review.images.map((image, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={`${review.place} - Image ${index + 1}`}
                        className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    👍 Helpful ({review.helpful})
                  </Button>
                  <Button variant="outline" size="sm">
                    Share Review
                  </Button>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="default" className="bg-primary hover:bg-primary/90">
                    View All Reviews
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have you visited this place? Share your experience!
          </p>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Write a Review
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ReviewOfTheDay

