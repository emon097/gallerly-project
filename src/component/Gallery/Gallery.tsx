import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

type ImageSelection = { [key: number]: boolean };

const Gallery: React.FC = () => {
  const [imageSelection, setImageSelection] = useState<ImageSelection>({});
  console.log(imageSelection)
  const [imageUrls, setImageUrls] = useState<string[]>([
    'https://i.ibb.co/6gmyLDF/image-11.jpg', // Replacing the first four images with a single image
    'https://i.ibb.co/FhBFc6p/image-3.webp',
    'https://i.ibb.co/FHxS5fD/image-4.webp',
    'https://i.ibb.co/rH0JGG1/image-5.webp',
    'https://i.ibb.co/NxCgLCf/image-6.webp',
    'https://i.ibb.co/n6X392P/image-7.webp',
    'https://i.ibb.co/NxCgLCf/image-6.webp',
    'https://i.ibb.co/Jk6grWG/image-8.webp',
    'https://i.ibb.co/yp622WJ/image-9.webp',
    'https://i.ibb.co/WtFrDKq/image-10.jpg',
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
  const selectedItemCount = Object.values(imageSelection).filter((selected) => selected).length;
  console.log(selectedItemCount);
  
  return (
    <div className=" gap-14 m-10">
      <div className='flex justify-end items-center'>
      {selectedItemCount > 0 && (
          <h1 className='text-3xl text-red-400'>{selectedItemCount} Item you have Selected</h1>
        )}
        <button className='bg-white mx-5 text-xl text-black w-32 my-20' onClick={handleDeleteSelectedImages}>
          Delete
        </button>
      </div>
      <div>
      </div>
      <div className='grid gap-14 grid-cols-1 md:grid-cols-2'>
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {/* Your other elements */}
        <Draggable draggableId="unique-draggable-id" index={0}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div
            className={`clickable-container ${imageSelection[0] ? 'selected' : ''}`}
            onClick={() => handleImageSelection(0)}
          >
            <input
              id="link-checkbox"
              type="checkbox"
              value=""
              className="w-32 p-16 h-4"
              checked={imageSelection[0] || false}
              onChange={() => handleImageSelection(0)}
            />
            <img
              data-for="link-checkbox"
              className={`block w-50 h-50 hover:bg-slate-500 relative rounded-lg ${imageSelection[0] ? 'shadow' : ''}`}
              src={imageUrls[0]}
              alt=""
            />
          </div>
            </div>
          )}
        </Draggable>
        {/* Additional draggable elements */}
      </div>
    )}
  </Droppable>
          
          <Droppable droppableId="image-gallery">
            {(provided) => (
              <div className='grid gap-14 grid-cols-2' ref={provided.innerRef} {...provided.droppableProps}>
                {imageUrls.slice(1).map((imageUrl, index) => (
                  <Draggable key={index + 1} draggableId={`image-${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className={`image-container col-span-4 ${imageSelection[index + 1] ? 'selected' : ''}`}>
                          <div
                            className={`clickable-container ${imageSelection[index + 1] ? 'selected' : ''}`}
                            onClick={() => handleImageSelection(index + 1)}
                          >
                            <input
                              id="link-checkbox"
                              type="checkbox"
                              value=""
                              className="w-32 p-16 h-4"
                              checked={imageSelection[index + 1] || false}
                              onChange={() => handleImageSelection(index + 1)}
                            />
                            <img
                              data-for="link-checkbox"
                              className={`h-auto hover:bg-slate-500 relative max-w-full rounded-lg ${imageSelection[index + 1] ? 'shadow' : ''}`}
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
    </div>
  );
};

export default Gallery;
