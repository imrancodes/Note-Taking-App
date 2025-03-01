import React from 'react';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { createLowlight, all } from 'lowlight';
import 'highlight.js/styles/github-dark.css';
import '../../index.css';
import { FaBold, FaItalic, FaStrikethrough } from 'react-icons/fa';
import { FaUnderline } from 'react-icons/fa6';
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu';
import { GoListUnordered, GoListOrdered } from 'react-icons/go';
import { GrBlockQuote } from 'react-icons/gr';
import { BiCodeBlock } from 'react-icons/bi';
import { FaCode } from 'react-icons/fa6';
import { IoIosLink } from 'react-icons/io';
import { FaLinkSlash, FaRegImage } from 'react-icons/fa6';
import Heading from '@tiptap/extension-heading';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import CodeBlockComponent from './CodeBlockComponent';
import Placeholder from '@tiptap/extension-placeholder'

const lowlight = createLowlight(all);

lowlight.register('html', html);
lowlight.register('css', css);
const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      Heading.configure({ levels: [1, 2, 3] }),
      StarterKit.configure({
        heading: false,
        codeBlock: false
      }),
      Underline,
      Link,
      Image,
      Placeholder.configure({
        placeholder: 'Write your notes here...',
      }),
      CodeBlockLowlight
        .extend({
          addNodeView() {
            return ReactNodeViewRenderer(CodeBlockComponent);
          },
        })
        .configure({ lowlight }),
    ],
    content: `<p></p>`,
  });

  if (!editor) return null;

  return (
    <>
      <div className="flex flex-wrap gap-5 p-2 dark:text-white rounded mt-3 text-2xl">
        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-[#3E35F0] text-white' : ''
            }`}>
          <FaBold />
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-[#3E35F0] text-white' : ''
            }`}>
          <FaItalic />
        </button>

        {/* Underline */}
        <button
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className={`p-2 rounded ${editor.isActive('underline') ? 'bg-[#3E35F0] text-white' : ''
            }`}>
          <FaUnderline />
        </button>

        {/* Strikethrough */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded ${editor.isActive('strike') ? 'bg-[#3E35F0] text-white' : ''
            }`}>
          <FaStrikethrough />
        </button>

        {/* Headings (H1, H2, H3) */}
        <button
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
          onClick={() => editor.commands.toggleBulletList()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-[#3E35F0] text-white' : ''}`}
        >
          <GoListUnordered />
        </button>

        {/* Numbered List */}
        <button
          onClick={() => editor.commands.toggleOrderedList()}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-[#3E35F0] text-white' : ''}`}
        >
          <GoListOrdered />
        </button>

        {/* Blockquote */}
        <button
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-[#3E35F0] text-white' : ''
            }`}>
          <GrBlockQuote />
        </button>

        {/* Code Block */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded ${editor.isActive('codeBlock') ? 'bg-[#3E35F0]' : ''}`}
        >
          <BiCodeBlock />
        </button>

        {/* Inline Code */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded ${editor.isActive('code') ? 'bg-[#3E35F0] text-white' : ''
            }`}>
          <FaCode />
        </button>

        {/* Add Link */}
        <button
          onClick={() => {
            const url = prompt('Enter URL (Make sure to start with https://):')
            if (url) {
              editor.chain().focus().setLink({ href: url, target: '_blank' }).run();
            }
          }}
          className="p-2 rounded">
          <IoIosLink />
        </button>

        {/* Remove Link */}
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="p-2 rounded">
          <FaLinkSlash />
        </button>

        {/* Add Image */}
        <button
          onClick={() => {
            let url = prompt('Enter URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="p-2 rounded">
          <FaRegImage />
        </button>
      </div>
      <div className="p-4 max-[500px]:px-2 dark:bg-[#303034] bg-[#E5E7EB] rounded-lg shadow mb-4 mt-3">
        <EditorContent
          editor={editor}
          className="prose max-w-none dark:text-white"
        />
      </div>
    </>
  );
};

export default TextEditor;
