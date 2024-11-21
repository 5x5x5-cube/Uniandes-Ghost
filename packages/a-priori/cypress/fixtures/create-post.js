export const dataPool = [
    {
        test: {
            description:
                "Title at 255 char limit, random content, random URL word",
            outcome: "success",
            assert_text: "Boom! It's out there.",
            assert_type: "be.visible",
        },
        title: "drIkhyGYdxoYVkwRs2NGF2KuCz6npancBe3vh5KMds4gFBr8RTLup83NmcQK6aZhfLkJhnLZI5WGsLNyAFGnTDGdqJzUsc1rgsRgBVJQv4olm0sdrklJ0j863cJEdpTO8qMflJzg8k93qqnrdp1OnZ3xRATTQs7vmNaqeuwmLL2ND924TZQPMO7MmkOKc7JAIP4uEwDRKmX7RfUX9FzZkVm9o43ttNYXwVQLX3BonSdt1k91HXNoIRcof5XiEmp",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        url_word: "rwJQyP1AUQ",
    },
    {
        test: {
            description:
                "Title over 255 char limit, random content, random URL word",
            outcome: "error",
            assert_text: "Publish",
            assert_type: "not.exist",
        },
        title: "aZBYflZWXBvdQ2XuhMyrwRUCra2qUlhmSMqpNWMBTbDMHQy2qliLhIVBmoLzM3dZb1qjDv8ur9Laxp5vubMprHZyF7W2wHxyvcQt95N7Ld3pLXCW0nBtWDsTCpghOWEm0EPuiBlKpzMLk9nNi90sbDIavL0qR9wAZ5SbI8A0Bcqz7mulpfMGBzx3NJbqueiJes1JlPfuniPe7YJblXKY0dZEmd2x3yeA51wDJ8IgXR5Z9Zh40FUn9OHSrUCBnLLV",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        url_word: "7hzUqQs8b7",
    },
    {
        test: {
            description: "Empty title, random content, random URL word",
            outcome: "success",
            assert_text: "Boom! It's out there.",
            assert_type: "be.visible",
        },
        title: "",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        url_word: "qQOrFtktSv",
        outcome: "success",
    },
    {
        test: {
            description: "Random title, random content, random URL word",
            outcome: "success",
            assert_text: "Boom! It's out there.",
            assert_type: "be.visible",
        },
        title: "Lorem ipsum dolor sit amet",
        content: "",
        url_word: "lHNPJbBEFX",
        outcome: "success",
    },
    {
        test: {
            description: "Random title, random content, no URL set",
            outcome: "success",
            assert_text: "Boom! It's out there.",
            assert_type: "be.visible",
        },
        title: "Lorem ipsum dolor sit amet",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        url_word: "",
        outcome: "success",
    },
    {
        test: {
            description:
                "Title with special characters only, random content, random URL word",
            outcome: "error",
            assert_text: "Publish",
            assert_type: "not.exist",
        },
        title: '[%>?"]!$?&',
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        url_word: "ILNAvsdAkt",
    },
    {
        test: {
            description:
                "Title with special characters only, random content, random URL word",
            outcome: "success",
            assert_text: "Boom! It's out there.",
            assert_type: "be.visible",
        },
        test_description:
            "Random title, random content, URL with special characters only",
        title: "Lorem ipsum dolor sit amet",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        url_word: "$]&^*'>.>%",
    },
    {
        test: {
            description: "Empty title, empty content, random URL word",
            outcome: "error",
            assert_text: "Publish",
            assert_type: "not.exist",
        },
        title: "",
        content: "",
        url_word: "rcFNst74ch",
    },
];
