import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ArrowRight } from 'lucide-react';

export const About = () => {
  return (
    <div className="pb-20">
      <section className="pt-20 pb-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/10 blur-[120px] rounded-full -mr-64" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Empowering the next generation of <span className="text-brand-accent">Digital Entrepreneurs</span>.
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                Earners Hub was founded with a single mission: to democratize the knowledge of online income generation. We believe that in the age of AI and global connectivity, financial freedom should be accessible to anyone with an internet connection and the will to learn.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Our Mission', icon: Globe, desc: 'To provide legitimate, tested, and actionable strategies for making money online.' },
            { title: 'Our Vision', icon: MessageSquare, desc: 'A world where everyone has the tools to build their own digital business.' },
            { title: 'Our Values', icon: Send, desc: 'Transparency, integrity, and a commitment to our community\'s success.' }
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
            >
              <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <item.icon className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Why Earners Hub?</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">01</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Expert-Vetted Content</h4>
                  <p className="text-slate-600">Every strategy we share has been tested by our team of digital entrepreneurs. No fluff, just results.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">02</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">AI-First Approach</h4>
                  <p className="text-slate-600">We focus on the latest technology to help you work smarter and scale your income faster than ever before.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">03</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Global Community</h4>
                  <p className="text-slate-600">Join a network of thousands of like-minded individuals sharing tips, successes, and opportunities.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/seed/team/800/600" alt="Team" className="rounded-[2.5rem] shadow-2xl" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-10 -right-10 bg-brand-accent p-10 rounded-3xl text-white shadow-2xl hidden md:block">
              <p className="text-4xl font-bold mb-2">10M+</p>
              <p className="text-blue-100">Readers Annually</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const Contact = () => {
  return (
    <div className="pb-20">
      <section className="pt-20 pb-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8">Get in Touch</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have a question about a specific income strategy? Or maybe you want to partner with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                    <p className="text-slate-900 font-medium">hello@earnershub.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Call Us</p>
                    <p className="text-slate-900 font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visit Us</p>
                    <p className="text-slate-900 font-medium">Digital Nomad Way, Suite 101</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-primary p-8 rounded-3xl shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Follow Our Journey</h3>
              <p className="text-blue-100 mb-6">Stay updated with real-time opportunities on our social channels.</p>
              <div className="flex gap-4">
                {/* Social Icons */}
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20" placeholder="john@example.com" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20">
                    <option>General Inquiry</option>
                    <option>Partnership Opportunity</option>
                    <option>Content Contribution</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Your Message</label>
                  <textarea rows={6} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/20" placeholder="How can we help you?"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="w-full md:w-auto px-12 py-4 bg-brand-accent text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-brand-accent/20 flex items-center justify-center">
                    Send Message <Send className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
