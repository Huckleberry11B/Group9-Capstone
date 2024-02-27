module.exports = (page) => {
    const blocks = [];
    const paragraphs = [];
    const lines = [];
    const words = [];
    const symbols = [];
  
    if (page.blocks) {
      page.blocks.forEach((block) => {
        block.paragraphs.forEach((paragraph) => {
          paragraph.lines.forEach((line) => {
            line.words.forEach((word) => {
              word.symbols.forEach((sym) => {
                symbols.push({
                  ...sym, page, block, paragraph, line, word,
                });
              });
              words.push({
                ...word, page, block, paragraph, line,
              });
            });
            lines.push({
              ...line, page, block, paragraph,
            });
          });
          paragraphs.push({
            ...paragraph, page, block,
          });
        });
        blocks.push({
          ...block, page,
        });
      });
    }
  
    return {
      ...page, blocks, paragraphs, lines, words, symbols,
    };
  };