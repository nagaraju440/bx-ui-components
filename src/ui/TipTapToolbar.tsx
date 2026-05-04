import { ClearFormatIcon } from "@public/assets/CleareFormatIcon";
import { BlockQuoteIcon } from "@public/assets/Editor/BlockQuoteIcon";
import { BoldIcon } from "@public/assets/Editor/BoldIcon";
import { CodeIcon } from "@public/assets/Editor/CodeIcon";
import { ImageIcon } from "@public/assets/Editor/ImageIcon";
import { ItalicIcon } from "@public/assets/Editor/ItalicIcon";
import { LinkIcon } from "@public/assets/Editor/LinkIcon";
import { ListIcon } from "@public/assets/Editor/ListIcon";
import { OrderListIcon } from "@public/assets/Editor/OrderListIcon";
import { RedoIcon } from "@public/assets/Editor/RedoIcon";
import { StrikeIcon } from "@public/assets/Editor/StrikeIcon";
import { UnderlineIcon } from "@public/assets/Editor/UnderlineIcon";
import { UndoIcon } from "@public/assets/Editor/UndoIcon";
import { HorizontalRuleIcon } from "@public/assets/HorizontalRuleIcon";
import { SourceCodeIcon } from "@public/assets/SourceCodeIcon";
import { type Editor } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight, ChevronDown } from "lucide-react";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useCommonComponentStrings } from "src/i18n/useCommonComponentStrings";
import { cn } from "src/lib/utils";
import { uploadTextEditorAssetToS3 } from "src/utility/textEditorAssetUtils";
import { Bounce, toast } from "react-toastify";

interface ITipTapToolbar {
  editor: Editor;
  showSourceCode: boolean;
  setShowSourceCode: (show: boolean) => void;
  htmlContent: string;
  setHtmlContent: (content: string) => void;
}

interface Buttons {
  editor: Editor;
}
export const TipTapToolbar = ({
  editor,
  showSourceCode,
  setShowSourceCode,
  htmlContent,
  setHtmlContent,
}: ITipTapToolbar) => {
  return (
    <section
      className={cn(
        "flex min-h-11 w-full flex-wrap items-center justify-between rounded-[12px] bg-[#FAFAFA] px-2",
        showSourceCode && "cursor-not-allowed" //when we are in source code mode, we don't want the toolbar to be clickable
      )}
    >
      <section
        className={cn(
          "flex items-center",
          showSourceCode && "pointer-events-none" //when we are in source code mode, we don't want the toolbar to be clickable
        )}
      >
        <UndoButton editor={editor} />
        <RedoButton editor={editor} />
      </section>
      <section
        className={cn(
          "flex items-center gap-2",
          showSourceCode && "pointer-events-none" //when we are in source code mode, we don't want the toolbar to be clickable
        )}
      >
        <TextSizeDropdown editor={editor} />
        <FontSizeDropdown editor={editor} />
      </section>

      <section
        className={cn(
          "flex items-center",
          showSourceCode && "pointer-events-none" //when we are in source code mode, we don't want the toolbar to be clickable
        )}
      >
        <AlignmentDropdown editor={editor} />
      </section>

      <section
        className={cn(
          "flex items-center",
          showSourceCode && "pointer-events-none" //when we are in source code mode, we don't want the toolbar to be clickable
        )}
      >
        <ColorDropdown editor={editor} />
      </section>

      <section
        className={cn(
          "flex items-center",
          showSourceCode && "pointer-events-none" //when we are in source code mode, we don't want the toolbar to be clickable
        )}
      >
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <UnderlineButton editor={editor} />
        <StrikeButton editor={editor} />
        <ClearFormat editor={editor} />
      </section>

      <section
        className={cn(
          "flex items-center",
          showSourceCode && "pointer-events-none" //when we are in source code mode, we don't want the toolbar to be clickable
        )}
      >
        <ListButton editor={editor} />
        <OrderListButton editor={editor} />
      </section>

      <section
        className={cn(
          "flex items-center",
          showSourceCode && "pointer-events-none" //when we are in source code mode, we don't want the toolbar to be clickable
        )}
      >
        <LinkButton editor={editor} />
        <ImageButton editor={editor} />
        <CodeButton editor={editor} />
        <BlockQuoteButton editor={editor} />
        <HorizontalRule editor={editor} />
      </section>

      <section className={cn("flex items-center")}>
        <SourceCode
          editor={editor}
          showSourceCode={showSourceCode}
          setShowSourceCode={setShowSourceCode}
          htmlContent={htmlContent}
          setHtmlContent={setHtmlContent}
        />
      </section>
    </section>
  );
};

type IToolbarButton = {
  children: React.ReactNode;
  handleClick: () => void;
  isActive?: boolean;
};

export const ToolbarButton = ({
  children,
  handleClick,
  isActive,
}: IToolbarButton) => {
  return (
    <button
      className={cn(
        "text-black hover:rounded-[5px] hover:bg-[#5E5FC3] hover:fill-white",
        isActive && "rounded-[5px] bg-[#5E5FC3] fill-white"
      )}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  );
};

interface IUndoButton extends Buttons {}
export const UndoButton = ({ editor }: IUndoButton) => {
  return (
    <ToolbarButton
      handleClick={() => {
        editor.chain().focus().undo().run();
      }}
    >
      <UndoIcon />
    </ToolbarButton>
  );
};

interface IRedoButton extends Buttons {}
export const RedoButton = ({ editor }: IRedoButton) => {
  return (
    <ToolbarButton
      handleClick={() => {
        editor.chain().focus().redo().run();
      }}
    >
      <RedoIcon />
    </ToolbarButton>
  );
};

interface IBoldButton extends Buttons {}
export const BoldButton = ({ editor }: IBoldButton) => {
  return (
    <ToolbarButton
      handleClick={() => {
        editor.chain().focus().toggleBold().run();
      }}
      isActive={editor?.isActive("bold")}
    >
      <BoldIcon />
    </ToolbarButton>
  );
};

interface IItalicButton extends Buttons {}
export const ItalicButton = ({ editor }: IItalicButton) => {
  return (
    <ToolbarButton
      handleClick={() => {
        editor.chain().focus().toggleItalic().run();
      }}
      isActive={editor?.isActive("italic")}
    >
      <ItalicIcon />
    </ToolbarButton>
  );
};

interface IUnderlineButton extends Buttons {}
export const UnderlineButton = ({ editor }: IUnderlineButton) => {
  return (
    <ToolbarButton
      handleClick={() => {
        editor.chain().focus().toggleUnderline().run();
      }}
      isActive={editor?.isActive("underline")}
    >
      <UnderlineIcon />
    </ToolbarButton>
  );
};

interface IStrikeButton extends Buttons {}
export const StrikeButton = ({ editor }: IStrikeButton) => {
  return (
    <ToolbarButton
      handleClick={() => {
        editor.chain().focus().toggleStrike().run();
      }}
      isActive={editor?.isActive("strike")}
    >
      <StrikeIcon />
    </ToolbarButton>
  );
};

interface IListButton extends Buttons {}
export const ListButton = ({ editor }: IListButton) => {
  return (
    <ToolbarButton
      handleClick={() => {
        editor.chain().focus().toggleBulletList().run();
      }}
      isActive={editor?.isActive("bulletList")}
    >
      <ListIcon />
    </ToolbarButton>
  );
};

interface IOrderListButton extends Buttons {}
export const OrderListButton = ({ editor }: IOrderListButton) => {
  return (
    <ToolbarButton
      handleClick={() => {
        editor.chain().focus().toggleOrderedList().run();
      }}
      isActive={editor?.isActive("orderedList")}
    >
      <OrderListIcon />
    </ToolbarButton>
  );
};

interface ILinkButton extends Buttons {}
export const LinkButton = ({ editor }: ILinkButton) => {
  const t = useCommonComponentStrings();

  return (
    <ToolbarButton
      handleClick={() => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt(t("textEditor.urlPrompt"), previousUrl);
        if (url === null) {
          return;
        }
        if (url === "") {
          editor.chain().focus().extendMarkRange("link").unsetLink().run();
          return;
        }
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      }}
      isActive={editor?.isActive("link")}
    >
      <LinkIcon />
    </ToolbarButton>
  );
};

interface IImageButton extends Buttons {}
export const ImageButton = ({ editor }: IImageButton) => {
  const t = useCommonComponentStrings();

  const maxFileSize = 5 * 1024 * 1024;

  const ref = useRef<HTMLInputElement | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadingImage(true);
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        if (file.size > maxFileSize) {
          toast.error(
            t("textEditor.uploadImageError") as string,
            {
              toastId: "description",
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              className: "custom-toast !min-w-[300px] !max-w-[500px]",
              bodyClassName: "custom-toast-body",
            }
          );

          return false;
        }

        try {
          const { publicDownloadUrl } = await uploadTextEditorAssetToS3(file);

          // Update editor content with the uploaded image URL
          editor.chain().focus().setImage({ src: publicDownloadUrl }).run();
        } catch (error) {
          console.error(t("textEditor.uploadImageConsoleError"), error);
          setUploadingImage(false);
          return;
        }

        const { state } = editor;
        const imagePos = state.selection.anchor;
        const resolvedPos =
          imagePos > 0 ? state.doc.resolve(imagePos - 1) : state.doc.resolve(0);
        const marksBeforeImage = resolvedPos.marks();

        editor.chain().createParagraphNear().focus().run();

        if (marksBeforeImage.length > 0) {
          const chain = editor.chain().focus();
          for (const mark of marksBeforeImage) {
            chain.setMark(mark.type.name, mark.attrs);
          }
          chain.run();
        }
      }
    } finally {
      if (ref.current) {
        ref.current.value = "";
      }
      setUploadingImage(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
        ref={ref}
      />

      <ToolbarButton
        handleClick={() => {
          ref.current?.click();
        }}
        isActive={editor?.isActive("image")}
      >
        <ImageIcon />
      </ToolbarButton>

      <div className="flex h-fit w-fit items-center justify-center !rounded-md text-base">
        {uploadingImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center !rounded-2xl bg-[white]/50 opacity-100">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </>
  );
};

interface ICodeButton extends Buttons {}
export const CodeButton = ({ editor }: ICodeButton) => {
  return (
    <ToolbarButton
      handleClick={() => {
        editor.chain().focus().toggleCode().run();
      }}
      isActive={editor?.isActive("code")}
    >
      <CodeIcon />
    </ToolbarButton>
  );
};

interface IQuoteButton extends Buttons {}
export const BlockQuoteButton = ({ editor }: IQuoteButton) => {
  return (
    <ToolbarButton
      handleClick={() => {
        editor.chain().focus().toggleBlockquote().run();
      }}
      isActive={editor?.isActive("blockquote")}
    >
      <BlockQuoteIcon />
    </ToolbarButton>
  );
};

interface ITextSizeDropdown extends Buttons {}
export const TextSizeDropdown = ({ editor }: ITextSizeDropdown) => {
  const getSelectedHeadingValue = () => {
    if (editor?.isActive("heading", { level: 1 })) return "h1";
    if (editor?.isActive("heading", { level: 2 })) return "h2";
    if (editor?.isActive("heading", { level: 3 })) return "h3";
    return "normal";
  };

  const handleHeadingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLevel = event.target.value;
    if (newLevel === "normal") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level: any = parseInt(newLevel.replace("h", ""), 10);
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const t = useCommonComponentStrings();

  return (
    <select
      value={getSelectedHeadingValue()}
      onChange={handleHeadingChange}
      className="cursor-pointer bg-transparent text-[14px]"
    >
      <option value="normal">{t("textEditor.normalText")}</option>
      <option value="h1">{t("textEditor.heading1")}</option>
      <option value="h2">{t("textEditor.heading2")}</option>
      <option value="h3">{t("textEditor.heading3")}</option>
    </select>
  );
};

export const AlignmentDropdown = ({ editor }: ITextSizeDropdown) => {
  const alignmentItems = [
    {
      label: "Left",
      action: () => editor.chain().focus().setTextAlign("left").run(),
      activeCheck: { textAlign: "left" },
      icon: <AlignLeft />,
    },
    {
      label: "Center",
      action: () => editor.chain().focus().setTextAlign("center").run(),
      activeCheck: { textAlign: "center" },
      icon: <AlignCenter />,
    },
    {
      label: "Right",
      action: () => editor.chain().focus().setTextAlign("right").run(),
      activeCheck: { textAlign: "right" },
      icon: <AlignRight />,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="flex items-center rounded-lg p-1"
        ref={ref}
      >
        {editor?.isActive({ textAlign: "left" })
          ? alignmentItems[0].icon
          : editor?.isActive({ textAlign: "center" })
            ? alignmentItems[1].icon
            : alignmentItems[2].icon}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 rounded-lg bg-white shadow-md">
          {alignmentItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className={`block w-full px-3 py-2 text-left ${
                editor?.isActive(item.activeCheck)
                  ? "bg-sky-700 text-white"
                  : ""
              } hover:bg-sky-700 hover:text-white`}
            >
              {item.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

type ColorDropdownProps = {
  editor: Editor;
};

const ColorDropdown: React.FC<ColorDropdownProps> = ({ editor }) => {
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const rgbToHex = (rgb: string) => {
      const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    };

    const updateColor = () => {
      const currentColor = editor.getAttributes("textStyle").color;
      if (!currentColor) {
        setColor("#000000");
        return;
      }
      setColor(
        currentColor.startsWith("#") ? currentColor : rgbToHex(currentColor)
      );
    };

    editor.on("selectionUpdate", updateColor);
    return () => {
      editor.off("selectionUpdate", updateColor);
    };
  }, [editor]);

  // Handle color change
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);
    editor.chain().focus().setColor(newColor).run();
  };

  // Simulate click on the hidden color input

  return (
    <div className="flex items-center">
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="w-[28px] cursor-pointer border-none"
        id="text-color"
      />
      <label htmlFor="text-color">
        <ChevronDown className="ml-1 h-4 w-4 cursor-pointer" />
      </label>
    </div>
  );
};

/**
 * @function HorizontalRule
 * @description Add horizontal rule
 * @param {Editor} editor
 * @returns
 */
export const HorizontalRule = ({ editor }: { editor: Editor }) => {
  return (
    <ToolbarButton
      handleClick={() => editor.chain().focus().setHorizontalRule().run()}
    >
      <HorizontalRuleIcon />
    </ToolbarButton>
  );
};

/**
 * @function ClearFormat
 * @description When we click on this button it will clear all the formatting
 * @param {Editor} editor
 * @returns
 */
export const ClearFormat = ({ editor }: { editor: Editor }) => {
  return (
    <ToolbarButton
      handleClick={() =>
        editor
          .chain()
          .focus()
          .clearNodes()
          .unsetAllMarks()
          .setFontSize("18px")
          .run()
      }
    >
      <ClearFormatIcon />
    </ToolbarButton>
  );
};

/**
 * @function SourceCode
 * @description On toggle of this button you can able to see the html code of which you have written in the editor
 * @param {ITipTapToolbar}
 * @returns
 */
export const SourceCode = ({
  editor,
  showSourceCode,
  setShowSourceCode,
  htmlContent,
  setHtmlContent,
}: ITipTapToolbar) => {
  const toggleSourceCode = () => {
    if (!editor) return;

    if (showSourceCode) {
      // Apply changes back to the editor when switching back to WYSIWYG mode
      editor.commands.setContent(htmlContent, true);
    } else {
      // Get the HTML from the editor when switching to Source Code mode
      setHtmlContent(editor.getHTML());
    }

    setShowSourceCode(!showSourceCode);
  };
  return (
    <ToolbarButton handleClick={toggleSourceCode} isActive={showSourceCode}>
      <SourceCodeIcon />
    </ToolbarButton>
  );
};

/**
 * @function FontSizeDropdown
 * @description it is having the font size dropdown and an input also for entering the font size and it will apply to the selected text and we can get the font size at caret position
 * @param {Editor} editor
 * @returns
 */
export const FontSizeDropdown = ({ editor }: { editor: Editor }) => {
  const sizes = [
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "26",
    "28",
    "36",
    "48",
    "72",
  ];
  const [fontSize, setFontSize] = useState("18");
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to set font size
  const changeFontSize = (size: string) => {
    setFontSize(size);

    if (editor) {
      editor.chain().focus().setFontSize(`${size}px`).run(); // Apply the font size to the selected text
    }
  };

  // Function to get font size at caret position
  const updateFontSizeAtCaret = () => {
    const tiptapFontSize = editor.getAttributes("textStyle").fontSize;
    if (tiptapFontSize) {
      setFontSize(Number.parseInt(tiptapFontSize).toString());
      return;
    }

    const selection = globalThis.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedNode = range.startContainer;

      if (selectedNode.nodeType === Node.TEXT_NODE) {
        const parentElement = selectedNode.parentNode;
        let targetElement = parentElement;
        while (targetElement && targetElement.nodeName !== "SPAN") {
          targetElement = targetElement.parentElement;
        }

        if (targetElement?.nodeName === "SPAN") {
          const computedStyle = globalThis.getComputedStyle(
            targetElement as HTMLElement
          );
          const currentFontSize = Number.parseInt(computedStyle.fontSize, 10);
          setFontSize(currentFontSize.toString());
          return;
        }
      }
    }

    setFontSize("18");
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      updateFontSizeAtCaret();
    };

    editor?.on("selectionUpdate", handleSelectionChange);

    return () => {
      editor?.off("selectionUpdate", handleSelectionChange);
    };
  }, [editor]);

  const dropdownRef = useRef<any>(null);

  // Click event to handle closing the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        dropdownRef.current &&
        !dropdownRef?.current?.contains(target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center rounded-md border">
      {/* Input field for font size */}
      <input
        id="font-size-input"
        type="text"
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value)}
        onBlur={() => !isNaN(Number(fontSize)) && changeFontSize(fontSize)}
        min={8}
        className="w-16 bg-transparent px-1 text-center text-[14px] focus:outline-none"
        onKeyPress={(e) => {
          // Prevent non-numeric characters
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
      />

      {/* Dropdown icon */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className={cn(
            "cursor-pointer items-center justify-center rounded border-l px-2 py-1",
            showDropdown && "bg-[#5E5FC3]"
          )}
        >
          <ChevronDown
            className="h-4 w-4"
            stroke={showDropdown ? "white" : "black"}
          />
        </button>

        {/* Dropdown for font sizes */}
        {showDropdown && (
          <div
            className="absolute -left-16 top-full z-10 mt-1 h-56 w-24 overflow-y-scroll rounded-md border border-gray-300 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent clicks from closing the dropdown prematurely
          >
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => {
                  editor?.chain().focus(); // Ensure editor is focused
                  changeFontSize(size); // Apply the selected font size
                  setShowDropdown(false); // Close dropdown after selection
                }}
                className={`h-8 w-full cursor-pointer p-1 text-center !text-[14px] ${fontSize === size ? "bg-[#7677F4] text-white" : "hover:bg-[#7677F4] hover:text-white"}`}
              >
                {size}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
