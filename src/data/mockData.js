export const features = [
    {
        id: 1,
        icon: 'Sparkles',
        title: 'AI-Powered Matching',
        description: 'Our intelligent algorithm connects you with people who share your interests, goals, and professional aspirations.'
    },
    {
        id: 2,
        icon: 'MessageCircle',
        title: 'Smart Messaging',
        description: 'Communicate seamlessly with AI-enhanced conversations that help you make meaningful connections.'
    },
    {
        id: 3,
        icon: 'Newspaper',
        title: 'Personalized Feed',
        description: 'Discover content tailored to your interests and engage with your professional community.'
    },
    {
        id: 4,
        icon: 'Users',
        title: 'Community Building',
        description: 'Join groups and communities that align with your professional interests and career goals.'
    }
];

export const feedPosts = [
    {
        id: 1,
        image: 'https://i.pravatar.cc/150?img=1',
        name: 'Sarah Coleman',
        role: 'Product Designer at Spotify',
        time: '2 hours ago',
        post: 'Incredibly proud of the work our design team is putting in at Spotify! Here\'s our new dashboard interface design. Can\'t wait to hear all the amazing feedback from everyone and my team. #design #productdesign #spotify',
        postImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
        hashtags: ['design', 'product', 'spotify'],
        likes: 152,
        comments: 45,
        shares: 12,
        saves: 28
    },
    {
        id: 2,
        image: 'https://i.pravatar.cc/150?img=2',
        name: 'Alex Chen',
        role: 'Full Stack Developer',
        time: '4 hours ago',
        post: 'Here\'s how I organized my desk setup to maximize my productivity with dual monitors and a coffee plant 🌿 What does your setup look like?',
        postImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
        hashtags: ['webdev', 'productivity', 'coding'],
        likes: 234,
        comments: 67,
        shares: 23,
        saves: 45
    },
    {
        id: 3,
        image: 'https://i.pravatar.cc/150?img=3',
        name: 'Maria Garcia',
        role: 'Data Scientist at TechFlow',
        time: '6 hours ago',
        post: 'Just finished building this data visualization dashboard for analyzing cryptocurrency trends 📊 The insights are fascinating! DM me if you want to collaborate on similar projects.',
        postImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        hashtags: ['datascience', 'crypto', 'analytics'],
        likes: 189,
        comments: 34,
        shares: 18,
        saves: 52
    },
    {
        id: 4,
        image: 'https://i.pravatar.cc/150?img=4',
        name: 'Ryan Wilson',
        role: 'Brand Designer',
        time: '8 hours ago',
        post: 'Recently worked on a branding project featuring sustainable products and natural materials. The color palette exploration was my favorite part! 🎨',
        postImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
        hashtags: ['branding', 'design', 'sustainability'],
        likes: 276,
        comments: 52,
        shares: 31,
        saves: 64
    },
    {
        id: 5,
        image: 'https://i.pravatar.cc/150?img=5',
        name: 'Emily Reese',
        role: 'UX Designer at Google',
        time: '12 hours ago',
        post: 'Working from my favorite coffee shop today ☕ Sometimes a change of scenery is all you need to spark creativity!',
        postImage: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&auto=format&fit=crop',
        hashtags: ['ux', 'design', 'remotework'],
        likes: 312,
        comments: 78,
        shares: 19,
        saves: 41
    }
];

export const trendingTopics = [
    { id: 1, label: 'Rust', posts: 1520 },
    { id: 2, label: 'Solana', posts: 856 },
    { id: 3, label: 'Webdev', posts: 2341 },
    { id: 4, label: 'ICPC', posts: 672 },
    { id: 5, label: 'Django', posts: 1128 }
];

export const suggestedUsers = [
    {
        id: 1,
        name: 'Jackson',
        role: 'Developer',
        avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
        id: 2,
        name: 'Samantha',
        role: 'Designer',
        avatar: 'https://i.pravatar.cc/150?img=13'
    },
    {
        id: 3,
        name: 'Mike Taylor',
        role: 'Product Manager',
        avatar: 'https://i.pravatar.cc/150?img=14'
    }
];

export const connectionRequests = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "UX Researcher at Google",
        mutual: 12,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Frontend Dev at StartupX",
        mutual: 3,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    }
];

export const possibleConnections = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "Frontend Developer",
        bio: "Passionate about creating beautiful UIs. Always looking for exciting projects!",
        location: "San Francisco",
        skills: ["React", "TypeScript", "CSS"],
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        isOnline: true,
        github: "https://github.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 2,
        name: "Alex Kumar",
        role: "Backend Developer",
        bio: "Backend architect with 5+ years experience. Love building scalable systems.",
        location: "New York",
        skills: ["Node.js", "MongoDB", "Python"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        isOnline: true,
        github: "https://github.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 3,
        name: "Emma Wilson",
        role: "Full-Stack Developer",
        bio: "Full-stack developer & startup enthusiast. Let's build something amazing!",
        location: "Austin",
        skills: ["React", "Node.js", "SQL"],
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        isOnline: false,
        github: "https://github.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 4,
        name: "James Lee",
        role: "Frontend Developer",
        bio: "Frontend wizard specializing in Vue.js and modern web animations.",
        location: "Seattle",
        skills: ["Vue", "JavaScript", "HTML"],
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        isOnline: true,
        github: "https://github.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 5,
        name: "Maya Patel",
        role: "Backend Developer",
        bio: "Python expert | ML enthusiast | Open source contributor",
        location: "Boston",
        skills: ["Python", "Django", "SQL"],
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        isOnline: true,
        github: "https://github.com",
        linkedin: "https://linkedin.com"
    },
    {
        id: 6,
        name: "David Park",
        role: "Full-Stack Developer",
        bio: "Always learning, always building. Open to collaborations!",
        location: "Chicago",
        skills: ["Angular", "Express", "MongoDB"],
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        isOnline: false,
        github: "https://github.com",
        linkedin: "https://linkedin.com"
    }
];

export const jobs = [
    {
        id: 1,
        title: "Senior React Developer",
        company: "TechFlow",
        location: "Remote",
        salary: "$120k - $150k",
        type: "Full-time",
        postedAt: "2h ago",
        tags: ["React", "Node.js", "TypeScript"]
    },
    {
        id: 2,
        title: "UI/UX Designer",
        company: "Creative Studio",
        location: "New York, NY",
        salary: "$90k - $120k",
        type: "Hybrid",
        postedAt: "5h ago",
        tags: ["Figma", "UI Design", "User Research"]
    },
    {
        id: 3,
        title: "Product Manager",
        company: "Innovate Inc",
        location: "San Francisco, CA",
        salary: "$140k - $180k",
        type: "On-site",
        postedAt: "1d ago",
        tags: ["Product Strategy", "Agile", "Leadership"]
    }
];

export const projects = [];

export const userProfile = {
    name: "Alex Morgan",
    username: "alexmorgan722",
    role: "Product Designer at TechFlow",
    avatar: "https://i.pravatar.cc/150?img=11",
    bannerColor: "#0f172a",
    socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
    },
    stats: [
        { label: "Projects", value: "12", color: "blue", icon: "Briefcase" },
        { label: "Connections", value: "548", color: "purple", icon: "Users" },
        { label: "Rating", value: "4.8", color: "orange", icon: "Star" },
        { label: "Badges", value: "8", color: "green", icon: "Award" }
    ],
    contactInfo: {
        location: "San Francisco, CA",
        email: "alex.morgan@techflow.com",
        website: "alexmorgan.design",
        joinDate: "Joined January 2024"
    },
    aboutMe: "Product Designer with a passion for building user-centric digital products. Experienced in creating seamless experiences across web and mobile platforms. Passionate about design systems and clean UI.",
    skills: ["React", "TypeScript", "Figma", "UI Design", "UX Research", "Tailwind CSS", "Next.js", "Docker"],
    achievements: [
        { id: 1, title: "Top Contributor 2024", description: "Awarded for consistent high-quality code contributions.", icon: "Trophy", color: "orange" },
        { id: 2, title: "5 Star Teammate", description: "Successfully rated by colleagues for collaboration.", icon: "Star", color: "blue" },
        { id: 3, title: "Rising Star", description: "Recognized as a fast-growing talent in the design community.", icon: "Zap", color: "green" },
        { id: 4, title: "Goal Achiever", description: "Completed 100% of the quarterly design objectives.", icon: "Target", color: "purple" }
    ],
    activity: [
        {
            id: 1,
            type: "post",
            time: "2 days ago",
            content: "Just completed a full redesign of the ConnectX dashboard. Challenging but extremely rewarding. Learned so much about advanced CSS layouts and React state management.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
            likes: 124,
            comments: 18
        },
        {
            id: 2,
            type: "update",
            time: "4 days ago",
            content: "Attended the annual ProductCon event today! 🤩 Inspiring talks about AI integration in product design and user research. Can't wait to implement some of these ideas in my next project!",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
            likes: 85,
            comments: 12
        }
    ]
};

export const conversations = [
    {
        id: 1,
        user: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
            status: "online",
            role: "Senior UI/UX Designer"
        },
        lastMessage: "The new design system looks promising! Let's discuss it tomorrow.",
        time: "10:45 AM",
        unread: 2,
        messages: [
            { id: 1, sender: "Sarah Chen", text: "Hey! Did you see the new documentation for the design system?", time: "10:30 AM", isSelf: false },
            { id: 2, sender: "You", text: "Just checking it out now. It's much more comprehensive than the previous version.", time: "10:32 AM", isSelf: true },
            { id: 3, sender: "Sarah Chen", text: "Exactly. I've updated the Figma components to match.", time: "10:35 AM", isSelf: false },
            { id: 4, sender: "Sarah Chen", text: "The new design system looks promising! Let's discuss it tomorrow.", time: "10:45 AM", isSelf: false }
        ]
    },
    {
        id: 2,
        user: {
            name: "Jackson Smith",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
            status: "offline",
            role: "Lead Developer"
        },
        lastMessage: "Great job on the latest PR. Everything is merged.",
        time: "Yesterday",
        unread: 0,
        messages: [
            { id: 1, sender: "You", text: "Sent the PR for the dashboard refactor.", time: "Yesterday", isSelf: true },
            { id: 2, sender: "Jackson Smith", text: "Reviewing it now...", time: "Yesterday", isSelf: false },
            { id: 3, sender: "Jackson Smith", text: "Great job on the latest PR. Everything is merged.", time: "Yesterday", isSelf: false }
        ]
    },
    {
        id: 3,
        user: {
            name: "Emma Wilson",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
            status: "online",
            role: "Frontend Architect"
        },
        lastMessage: "Are we still meeting at 2 PM?",
        time: "Yesterday",
        unread: 0,
        messages: [
            { id: 1, sender: "Emma Wilson", text: "Are we still meeting at 2 PM?", time: "Yesterday", isSelf: false }
        ]
    }
];
