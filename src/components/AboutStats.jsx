import React from 'react';
import AnimatedStat from './AnimatedStat'; // Import counter component

const AboutStats = () => {
    const brightBlue = '#38b6ff';

    const stats = [
        { value: '2+', label: 'Years of Expertise' },
        { value: '56+', label: 'Clients Globally' },
        { value: '150+', label: 'Dedicated Customers' },
        { value: '70+', label: 'Completed Projects' },
    ];
    
    return (
        <section className="bg-black py-16 sm:py-20 px-4 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center border-t border-gray-700 pt-10">
                    {stats.map((stat, index) => (
                    <AnimatedStat
                        key={index}
                        value={stat.value}
                        label={stat.label}
                        color={brightBlue}
                        index={index}
                    />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutStats;