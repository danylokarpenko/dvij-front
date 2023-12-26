import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

// fake data generator
const getItems = (items) =>
  items.map((item) => ({
    ...item,
    id: `${item.id}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((item, i) => ({ ...item, index: i }));
};

function DNDSortableList({ items: _items, setItems, ItemComponent }) {
  const items = getItems(_items);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const sortedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(sortedItems.map((item) => ({ ...item, id: Number(item.id) })));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    {ItemComponent && (
                      <ItemComponent
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        item={item}
                      />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

DNDSortableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setItems: PropTypes.func.isRequired,
  ItemComponent: PropTypes.elementType.isRequired,
};

export default DNDSortableList;
