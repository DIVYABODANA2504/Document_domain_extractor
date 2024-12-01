import React from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface TldSelectorProps {
  tlds: string[];
  onAddTld: (tld: string) => void;
  onRemoveTld: (tld: string) => void;
}

export function TldSelector({ tlds, onAddTld, onRemoveTld }: TldSelectorProps) {
  const [newTld, setNewTld] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTld && !tlds.includes(`.${newTld.toLowerCase()}`)) {
      onAddTld(`.${newTld.toLowerCase()}`);
      setNewTld('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newTld}
          onChange={(e) => setNewTld(e.target.value.replace(/[^a-zA-Z]/g, ''))}
          placeholder="Enter TLD (e.g. com)"
          className={cn(
            'flex-1 p-2 border rounded-lg',
            'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          )}
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {tlds.map((tld) => (
          <div
            key={tld}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
          >
            <span className="text-sm font-medium">{tld}</span>
            <button
              onClick={() => onRemoveTld(tld)}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}