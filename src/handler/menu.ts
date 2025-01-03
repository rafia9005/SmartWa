import { Ctx, SectionsBuilder } from "@mengkodingan/ckptw";

const MenuHandler = {
  name: "menu",
  code: async (ctx: Ctx) => {
    let section1 = new SectionsBuilder()
      .setDisplayText("Click me")
      .addSection({
        title: "Title 1",
        rows: [
          {
            header: "Row Header 1",
            title: "Row Title 1",
            description: "Row Description 1",
            id: "Row Id 1",
          },
          {
            header: "Row Header 2",
            title: "Row Title 2",
            description: "Row Description 2",
            id: "Row Id 2",
          },
        ],
      })
      .addSection({
        title: "This is title 2",
        rows: [
          { title: "Ping", id: "!ping" },
          { title: "Hello world", id: "hello world" },
        ],
      })
      .build();

    return ctx.sendInteractiveMessage(ctx.id!, {
      body: "this is body",
      footer: "this is footer",
      nativeFlowMessage: { buttons: [section1] },
    });
  },
};

module.exports = MenuHandler;
