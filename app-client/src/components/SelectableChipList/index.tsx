import React from 'react';
import type { NamedEntity } from '@/types/NamedEntity';
import * as S from './SelectableChipList.styles';

interface SelectableChipListProps<T extends NamedEntity> {
  items: T[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  isLoading?: boolean;
}

const SelectableChipList = <T extends NamedEntity>({
  items,
  selectedIds,
  onToggle,
  isLoading = false,
}: SelectableChipListProps<T>) => {
  if (isLoading) return null;

  return (
    <S.ChipContainer>
      {items?.map(item => (
        <S.Chip
          key={item.id}
          selected={selectedIds.includes(item.id)}
          onPress={() => onToggle(item.id)}
        >
          <S.ChipText selected={selectedIds.includes(item.id)}>
            {item.name}
          </S.ChipText>
        </S.Chip>
      ))}
    </S.ChipContainer>
  );
};

export default SelectableChipList;
