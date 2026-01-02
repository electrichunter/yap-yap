"use client";

type TimelineEvent = {
    id: string;
    date: string;
    title: string;
    description: string;
    status: "completed" | "in-progress" | "pending";
    photoUrl?: string; // Optional photo
};

export default function Timeline({ events }: { events: TimelineEvent[] }) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                📅 Canlı Takip
            </h2>

            <div className="relative border-l-2 border-muted ml-3 space-y-8 pb-4">
                {events.map((event, index) => (
                    <div key={event.id} className="relative pl-8">
                        {/* Dot */}
                        <span
                            className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-background ${event.status === "completed"
                                    ? "bg-primary"
                                    : event.status === "in-progress"
                                        ? "bg-yellow-500 animate-pulse"
                                        : "bg-muted"
                                }`}
                        />

                        {/* Content */}
                        <div className={`transition-opacity ${event.status === "pending" ? "opacity-50" : "opacity-100"}`}>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                                <span className="text-xs text-muted-foreground font-medium">{event.date}</span>
                            </div>

                            <p className="text-muted-foreground text-sm mb-3">{event.description}</p>

                            {event.photoUrl && (
                                <div className="relative h-40 w-full sm:w-60 rounded-lg overflow-hidden border border-border group cursor-pointer">
                                    {/* Placeholder for real image */}
                                    <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground text-xs">
                                        [Fotoğraf: {event.title}]
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <span className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">Büyüt</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
