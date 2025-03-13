
import { FaBold, FaItalic, FaStrikethrough } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa6';
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu';
import { GoListUnordered, GoListOrdered } from 'react-icons/go';
import { GrBlockQuote } from 'react-icons/gr';
import { BiCodeBlock } from 'react-icons/bi';
import { FaCode } from 'react-icons/fa6';
import { IoIosLink } from 'react-icons/io';
import { FaLinkSlash, FaRegImage } from 'react-icons/fa6';
import PropTypes from 'prop-types';


const ToolBar = ({ editor }) => {


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result;
      editor.chain().focus().setImage({ src: base64Image }).run();
    };
  };

  if (!editor) return null

  return (
    <>
      <div className="flex flex-wrap gap-5 p-2 dark:text-white rounded mt-3 text-2xl">
        {/* Bold */}
        <button
        title='Bold'
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-[#3E35F0] text-white' : ''
            }`}>
          <FaBold />
        </button>

        {/* Italic */}
        <button
        title='Italic'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic')
            ? 'bg-[#3E35F0] text-white'
            : ''
            }`}>
          <FaItalic />
        </button>

        {/* Underline */}
        <button
        title='Underline'
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className={`p-2 rounded ${editor.isActive('underline')
            ? 'bg-[#3E35F0] text-white'
            : ''
            }`}>
          <FaUnderline />
        </button>

        {/* Strikethrough */}
        <button
        title='Strikethrough'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${editor.isActive('strike')
            ? 'bg-[#3E35F0] text-white'
            : ''
            }`}>
          <FaStrikethrough />
        </button>

        {/* Headings (H1, H2, H3) */}
        <button
        title='Headings 1'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded ${editor.isActive('heading', { level: 1 })
            ? 'bg-[#3E35F0] text-white'
            : ''
            }`}>
          <LuHeading1 />
        </button>

        <button
        title='Headings 2'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded ${editor.isActive('heading', { level: 2 })
            ? 'bg-[#3E35F0] text-white'
            : ''
            }`}>
          <LuHeading2 />
        </button>

        <button
        title='Headings 3'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`p-2 rounded ${editor.isActive('heading', { level: 3 })
            ? 'bg-[#3E35F0] text-white'
            : ''
            }`}>
          <LuHeading3 />
        </button>

        {/* Bullet List */}
        <button
        title='Bullet List'
          onClick={() => editor.commands.toggleBulletList()}
          className={`p-2 rounded ${editor.isActive('bulletList')
            ? 'bg-[#3E35F0] text-white'
            : ''
            }`}>
          <GoListUnordered />
        </button>

        {/* Numbered List */}
        <button
        title='Numbered List'
          onClick={() => editor.commands.toggleOrderedList()}
          className={`p-2 rounded ${editor.isActive('orderedList')
            ? 'bg-[#3E35F0] text-white'
            : ''
            }`}>
          <GoListOrdered />
        </button>

        {/* Blockquote */}
        <button
        title='Blockquote'
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className={`p-2 rounded ${editor.isActive('blockquote')
            ? 'bg-[#3E35F0] text-white'
            : ''
            }`}>
          <GrBlockQuote />
        </button>

        {/* Code Block */}
        <button
        title='Code Block'
          onClick={() =>
            editor.chain().focus().toggleCodeBlock().run()
          }
          className={`p-2 rounded ${editor.isActive('codeBlock') ? 'bg-[#3E35F0]' : ''
            }`}>
          <BiCodeBlock />
        </button>

        {/* Inline Code */}
        <button
        title='Inline Code'
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded ${editor.isActive('code') ? 'bg-[#3E35F0] text-white' : ''
            }`}>
          <FaCode />
        </button>

        {/* Add Link */}
        <button
        title='Url'
          onClick={() => {
            const url = prompt(
              'Enter URL (Make sure to start with https://):'
            );
            if (url) {
              editor
                .chain()
                .focus()
                .setLink({ href: url, target: '_blank' })
                .run();
            }
          }}
          className="p-2 rounded">
          <IoIosLink />
        </button>

        {/* Remove Link */}
        <button
          title='Remove Url'
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="p-2 rounded">
          <FaLinkSlash />
        </button>

        {/* Add Image */}
        <input
        title='Image'
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="imageUpload"
        />
        <label
          htmlFor="imageUpload"
          className="p-2 rounded cursor-pointer">
          <FaRegImage />
        </label>
      </div>
    </>
  );
};

ToolBar.propTypes = {
  editor: PropTypes.object,
};

export default ToolBar;
