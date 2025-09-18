"use client";

import { useEffect, useState } from "react";

interface StatsData {
  totalContributions: number;
  totalUsers: number;
  contributionsThisMonth: number;
  mostPopularType: string;
}

export function ContributionStats() {
  const [stats, setStats] = useState<StatsData>({
    totalContributions: 0,
    totalUsers: 0,
    contributionsThisMonth: 0,
    mostPopularType: "film",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading stats from API
    const loadStats = async () => {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalContributions: 1247,
          totalUsers: 342,
          contributionsThisMonth: 89,
          mostPopularType: "film",
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const statsItems = [
    {
      label: "Toplam Katkı",
      value: stats.totalContributions.toLocaleString("tr-TR"),
      icon: "📊",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Aktif Kullanıcı",
      value: stats.totalUsers.toLocaleString("tr-TR"),
      icon: "👥",
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Bu Ay",
      value: stats.contributionsThisMonth.toLocaleString("tr-TR"),
      icon: "📈",
      color: "from-purple-500 to-violet-500",
    },
    {
      label: "En Popüler",
      value: "Film",
      icon: "🎬",
      color: "from-red-500 to-pink-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border p-6"
            style={{ 
              borderColor: "var(--border)", 
              backgroundColor: "var(--card)" 
            }}
          >
            <div className="animate-pulse">
              <div className="mb-4 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2 h-6 w-20 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsItems.map((item, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          style={{ 
            borderColor: "var(--border)", 
            backgroundColor: "var(--card)" 
          }}
        >
          {/* Background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
          />
          
          <div className="relative p-6">
            <div className="mb-4 text-3xl">{item.icon}</div>
            <div
              className="mb-1 text-3xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              {item.value}
            </div>
            <div
              className="text-sm font-medium"
              style={{ color: "var(--muted-foreground)" }}
            >
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
