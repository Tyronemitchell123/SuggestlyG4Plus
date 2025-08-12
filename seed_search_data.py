#!/usr/bin/env python3
"""
Search Data Seeding Script
Populates the database with sample content for testing search functionality
"""

import sqlite3
from datetime import datetime
import json

def seed_search_data():
    """Seed the database with sample searchable content"""
    
    # Sample content data
    sample_content = [
        {
            "title": "Quantum Computing Fundamentals",
            "content": "Quantum computing represents a revolutionary approach to computation that leverages quantum mechanical phenomena such as superposition and entanglement. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or qubits that can exist in multiple states simultaneously.",
            "category": "Technology",
            "tags": "quantum, computing, physics, technology",
            "author": "Dr. Quantum"
        },
        {
            "title": "Advanced AI and Machine Learning",
            "content": "Artificial Intelligence and Machine Learning have transformed the way we approach problem-solving in the digital age. From natural language processing to computer vision, AI systems are becoming increasingly sophisticated and capable of handling complex tasks.",
            "category": "AI/ML",
            "tags": "artificial intelligence, machine learning, neural networks, deep learning",
            "author": "AI Expert"
        },
        {
            "title": "Blockchain Technology and Cryptocurrency",
            "content": "Blockchain technology has emerged as a groundbreaking innovation that provides secure, transparent, and decentralized solutions for various industries. Cryptocurrencies like Bitcoin and Ethereum have demonstrated the potential of blockchain in financial applications.",
            "category": "Finance",
            "tags": "blockchain, cryptocurrency, bitcoin, ethereum, finance",
            "author": "Crypto Analyst"
        },
        {
            "title": "Cybersecurity Best Practices",
            "content": "In today's interconnected world, cybersecurity has become paramount for protecting sensitive information and maintaining digital privacy. Implementing robust security measures, regular updates, and user education are essential components of a comprehensive cybersecurity strategy.",
            "category": "Security",
            "tags": "cybersecurity, security, privacy, protection, digital safety",
            "author": "Security Specialist"
        },
        {
            "title": "Cloud Computing Solutions",
            "content": "Cloud computing has revolutionized the way businesses deploy and manage their IT infrastructure. From Infrastructure as a Service (IaaS) to Platform as a Service (PaaS), cloud solutions offer scalability, flexibility, and cost-effectiveness.",
            "category": "Technology",
            "tags": "cloud computing, AWS, Azure, Google Cloud, infrastructure",
            "author": "Cloud Architect"
        },
        {
            "title": "Data Science and Analytics",
            "content": "Data science combines statistical analysis, machine learning, and domain expertise to extract meaningful insights from large datasets. Modern analytics tools and techniques enable organizations to make data-driven decisions and gain competitive advantages.",
            "category": "Data",
            "tags": "data science, analytics, statistics, big data, insights",
            "author": "Data Scientist"
        },
        {
            "title": "Internet of Things (IoT) Applications",
            "content": "The Internet of Things connects everyday devices to the internet, enabling them to collect and exchange data. IoT applications span across smart homes, industrial automation, healthcare monitoring, and environmental sensing.",
            "category": "Technology",
            "tags": "IoT, internet of things, smart devices, sensors, connectivity",
            "author": "IoT Engineer"
        },
        {
            "title": "Digital Marketing Strategies",
            "content": "Digital marketing encompasses various online strategies for promoting products and services. From search engine optimization (SEO) to social media marketing, digital channels provide unprecedented opportunities for reaching target audiences.",
            "category": "Marketing",
            "tags": "digital marketing, SEO, social media, advertising, strategy",
            "author": "Marketing Expert"
        },
        {
            "title": "Sustainable Technology Solutions",
            "content": "Sustainable technology focuses on developing solutions that minimize environmental impact while meeting human needs. Green computing, renewable energy systems, and eco-friendly materials are key areas of sustainable technology innovation.",
            "category": "Sustainability",
            "tags": "sustainability, green technology, renewable energy, eco-friendly, environment",
            "author": "Sustainability Consultant"
        },
        {
            "title": "Financial Technology (FinTech) Trends",
            "content": "Financial technology is transforming traditional banking and financial services through innovative digital solutions. Mobile payments, peer-to-peer lending, and robo-advisors are reshaping how people manage their finances.",
            "category": "Finance",
            "tags": "fintech, financial technology, mobile payments, digital banking, innovation",
            "author": "FinTech Analyst"
        }
    ]
    
    try:
        # Connect to database
        conn = sqlite3.connect('suggestly_v3.db')
        cursor = conn.cursor()
        
        # Clear existing content
        cursor.execute('DELETE FROM searchable_content')
        
        # Insert sample content
        for content in sample_content:
            cursor.execute('''
                INSERT INTO searchable_content (title, content, category, tags, author, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                content['title'],
                content['content'],
                content['category'],
                content['tags'],
                content['author'],
                datetime.now(),
                datetime.now()
            ))
        
        # Commit changes
        conn.commit()
        conn.close()
        
        print(f"✅ Successfully seeded {len(sample_content)} search records")
        print("📊 Sample content categories:")
        categories = set(item['category'] for item in sample_content)
        for category in categories:
            print(f"   • {category}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error seeding data: {str(e)}")
        return False

if __name__ == '__main__':
    print("🌱 Seeding Search Database...")
    success = seed_search_data()
    if success:
        print("🎉 Database seeding completed successfully!")
    else:
        print("💥 Database seeding failed!")

