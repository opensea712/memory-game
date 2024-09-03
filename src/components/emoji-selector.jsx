/* eslint-disable react/prop-types */
import cx from 'classnames';

const EmojiSelector = ({ emojiCount, selectedEmoji, onEmojiSelect }) => {
  const emojiButtonClass = (index) => cx(
    'w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center',
    {
      'opacity-25': selectedEmoji !== index,
      'opacity-100': selectedEmoji === index,
    }
  );

  const handleEmojiSelect = (index) => {
    onEmojiSelect(index);
  };

  return (
    <div className='flex flex-col gap-4 p-5'>
      <div className='text-lg font-bold'>Select the emoji</div>
      <div className='flex flex-row flex-wrap gap-4 opa'>
        {Array.from({ length: emojiCount }, (_, index) => (
          <div
            key={index}
            className={emojiButtonClass(index)}
          >
            <button onClick={() => handleEmojiSelect(index)}>
              <img
                src={`/emojis/${index + 1}.png`}
                alt={`Emoji ${index + 1}`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiSelector;
