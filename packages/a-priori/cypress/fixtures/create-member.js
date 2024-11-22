export const dataPool = [
    {
        test: {
            description: "Random name, random valid email",
            outcome: "success",
            assert_text: "John Doe",
            assert_type: "exist",
        },
        name: "John Doe",
        email: `john.doe${Date.now()}@example.com`,
    },
    {
        test: {
            description: "Random name, random invalid email",
            outcome: "error",
            assert_text: "Invalid Email.",
            assert_type: "be.visible",
        },
        name: "John Doe",
        email: "jane.doe@invalid",
    },
    {
        test: {
            description: "Random name, random valid email at 191 char limit",
            outcome: "success",
            assert_text: "Alice limit",
            assert_type: "exist",
        },
        name: "Alice limit",
        email: `nimoadnminivimgquisgnostrudjexercisadasdfasfdasfstt${Date.now()}@example.com`,
    },
    {
        test: {
            description: "Random name, random valid email over 191 char limit",
            outcome: "error",
            assert_text: "Invalid Email.",
            assert_type: "be.visible",
        },
        name: "Bob over limit",
        email: `nimoadnminivimgquisgnostrudjexercisadasdfasfdasfstta${Date.now()}@example.com`,
    },
    {
        test: {
            description: "Empty string, random valid email",
            outcome: "success",
            assert_text: `empty.name${Date.now()}@example.com`,
            assert_type: "exist",
        },
        name: "",
        email: `empty.name${Date.now()}@example.com`,
    },
    {
        test: {
            description: "Name starts with a comma, random valid email",
            outcome: "error",
            assert_text: "Validation failed for name.",
            assert_type: "be.visible",
        },
        name: ",Charlie",
        email: "charlie@example.com",
    },
    {
        test: {
            description: "Name at 191 char limit, random valid email",
            outcome: "success",
            assert_text:
                "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-sed-do-eiusmod-tempor-incididunt-ut-labore-et-dolore-magna-aliqua-ut-enim-ad-minim-veniam-quis-nostrud-exercitation-ullamco-laboris-nisi",
            assert_type: "exist",
        },
        name: "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-sed-do-eiusmod-tempor-incididunt-ut-labore-et-dolore-magna-aliqua-ut-enim-ad-minim-veniam-quis-nostrud-exercitation-ullamco-laboris-nisi",
        email: `long.name${Date.now()}@example.com`,
    },
    {
        test: {
            description: "Name over 191 char limit, random valid email",
            outcome: "error",
            assert_text: "Name cannot be longer than 191 characters.",
            assert_type: "be.visible",
        },
        name: "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-sed-do-eiusmod-tempor-incididunt-ut-labore-et-dolore-magna-aliqua-ut-enim-ad-minim-veniam-quis-nostrud-exercitation-ullamco-laboris-nisil",
        email: "too.long.name@example.com",
    },
];
