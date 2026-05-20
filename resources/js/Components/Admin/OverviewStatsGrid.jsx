import { useState } from 'react';
import OverviewStatCard from '@/Components/Admin/OverviewStatCard';

/**
 * Grid statistik dengan auto-layout: saat satu card diperbesar,
 * card lain mengisi ulang tanpa space kosong di samping.
 */
export default function OverviewStatsGrid({ cards = [] }) {
    const [expandedId, setExpandedId] = useState(null);

    const handleToggleExpand = (id) => {
        setExpandedId((current) => (current === id ? null : id));
    };

    const expandedCard = expandedId ? cards.find((c) => c.id === expandedId) : null;
    const visibleCards = expandedId
        ? cards.filter((c) => c.id !== expandedId)
        : cards;

    return (
        <div className="space-y-4">
            {expandedCard && (
                <OverviewStatCard
                    {...expandedCard}
                    expanded
                    onExpandChange={() => setExpandedId(null)}
                />
            )}

            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                style={{ gridAutoFlow: 'dense' }}
            >
                {visibleCards.map((card) => (
                    <OverviewStatCard
                        key={card.id}
                        {...card}
                        expanded={false}
                        onExpandChange={() => handleToggleExpand(card.id)}
                        className={card.defaultWide && !expandedId ? 'md:col-span-2' : ''}
                    />
                ))}
            </div>
        </div>
    );
}
