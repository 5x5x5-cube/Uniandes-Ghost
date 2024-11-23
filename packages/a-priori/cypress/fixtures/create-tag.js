export const dataPool = [
    {
        test: {
            description:
                "Empty name, random description, random HEX 6 char, random slug",
            outcome: "error",
            assert_text: "You must specify a name for the tag.",
            assert_type: "be.visible",
        },
        name: "",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        color: "A1B2C3",
        slug: "lorem-ipsum",
    },
    {
        test: {
            description:
                "Empty string, random description, random HEX 6 char, random slug",
            outcome: "error",
            assert_text: "You must specify a name for the tag.",
            assert_type: "be.visible",
        },
        name: "     ",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        color: "A1B2C3",
        slug: "random-slug",
    },
    {
        test: {
            description:
                "Random name, random description, random HEX 6 char, random slug",
            outcome: "success",
            assert_text: "Lorem ipsum",
            assert_type: "exist",
        },
        name: "Lorem ipsum",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        color: "A1B2C3",
        slug: "lorem-ipsum",
    },
    {
        test: {
            description:
                "String that starts with a comma, random description, random HEX 6 char, random slug",
            outcome: "error",
            assert_text: "Tag names can't start with commas.",
            assert_type: "be.visible",
        },
        name: ",Lorem ipsum",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        color: "A1B2C3",
        slug: "logrem-ipsum",
    },
    {
        test: {
            description:
                "Random name, empty description, random HEX 6 char, random slug",
            outcome: "success",
            assert_text: "Lorem ipsum",
            assert_type: "exist",
        },
        name: "Lorem ipsum",
        description: "",
        color: "A1B2C3",
        slug: "lorem-ipsum",
    },
    {
        test: {
            description:
                "Random name, description at 500 char limit, random HEX 6 char, random slug",
            outcome: "success",
            assert_text: "Lorem ipsum",
            assert_type: "exist",
        },
        name: "Lorem ipsum",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
        color: "A1B2C3",
        slug: "lorem-ipsum",
    },
    {
        test: {
            description:
                "Random name, description over 500 char limit, random HEX 6 char, random slug",
            outcome: "error",
            assert_text: "Description cannot be longer than 500 characters.",
            assert_type: "be.visible",
        },
        name: "Lorem ipsum",
        description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibur",
        color: "A1B2C3",
        slug: "lorem-slug",
    },
    {
        test: {
            description:
                "Random name, random description, HEX below 6 char, random slug",
            outcome: "error",
            assert_text: "The colour should be in valid hex format",
            assert_type: "be.visible",
        },
        name: "Lorem ipsum",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        color: "A1B2",
        slug: "lorem-slug",
    },
    {
        test: {
            description:
                "Random name, random description, empty value, random slug",
            outcome: "success",
            assert_text: "Lorem ipsum",
            assert_type: "exist",
        },
        name: "Lorem ipsum",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        color: "",
        slug: "lorem-slug",
    },
    {
        test: {
            description:
                "Random name, random description, random HEX 6 char, empty slug",
            outcome: "success",
            assert_text: "Lorem ipsum",
            assert_type: "exist",
        },
        name: "Lorem ipsum",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        color: "A1B2C3",
        slug: "",
    },
    {
        test: {
            description:
                "Random name, random description, random HEX 6 char, string at 191 length",
            outcome: "success",
            assert_text: "Lorem ipsum",
            assert_type: "exist",
        },
        name: "Lorem ipsum",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        color: "A1B2C3",
        slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-sed-do-eiusmod-tempor-incididunt-ut-labore-et-dolore-magna-aliqua-ut-enim-ad-minim-veniam-quis-nostrud-exercitation-ullamco-laboris-nisi",
    },
    {
        test: {
            description:
                "Random name, random description, random HEX 6 char, slug over 191 char length",
            outcome: "error",
            assert_text: "URL cannot be longer than 191 characters.",
            assert_type: "be.visible",
        },
        name: "Lorem ipsum",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        color: "A1B2C3",
        slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit-sed-do-eiusmod-tempor-incididunt-ut-labore-et-dolore-magna-aliqua-ut-enim-ad-minim-veniam-quis-nostrud-exercitation-ullamco-laboris-nisil",
    },
];
