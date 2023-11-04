import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

type ImageSelection = { [key: number]: boolean };

const Gallery: React.FC = () => {
  const [imageSelection, setImageSelection] = useState<ImageSelection>({});
  const [imageUrls, setImageUrls] = useState<string[]>([
    'https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
    'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
  ]);

  const handleImageSelection = (index: number): void => {
    const updatedSelection: ImageSelection = { ...imageSelection };
    updatedSelection[index] = !updatedSelection[index];
    setImageSelection(updatedSelection);
  };

  const handleDeleteSelectedImages = (): void => {
    const updatedUrls = imageUrls.filter((_, index) => !imageSelection[index]);
    setImageUrls(updatedUrls);
    setImageSelection({});
  };

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    const reorderedUrls = [...imageUrls];
    const [movedImage] = reorderedUrls.splice(result.source.index, 1);
    reorderedUrls.splice(result.destination.index, 0, movedImage);

    setImageUrls(reorderedUrls);
  };

  return (
    <div className="grid gap-4">
      <div className='flex justify-end'>
        <button className='bg-white text-black w-32 my-20' onClick={handleDeleteSelectedImages}>Delete</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-gallery">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {imageUrls.map((imageUrl, index) => (
                <Draggable key={index} draggableId={`image-${index}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="image-container">
                        <div
                          className={`clickable-container ${imageSelection[index] ? 'selected' : ''}`}
                          onClick={() => handleImageSelection(index)}
                        >
                          <input
                            id="link-checkbox"
                            type="checkbox"
                            value=""
                            className="w-32 p-16 h-4"
                            checked={imageSelection[index] || false}
                            onChange={() => handleImageSelection(index)}
                          />
                          <img
                            data-for="link-checkbox"
                            className={`h-auto hover:bg-slate-500 relative -z-10 bottom-20 max-w-full rounded-lg ${imageSelection[index] ? 'selected' : ''}`}
                            src={imageUrl}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Gallery;
