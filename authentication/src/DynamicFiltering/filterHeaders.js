const filterHeaders = [
    {
      title: 'Category1',
      items: [
        {
          title: 'Sub-Category1',
          type: 'checkbox',
          items: ['SC1_item1', 'SC1_item2', 'SC1_item3', 'SC1_item4', 'SC1_item5'],
        },
        {
            title: 'Sub-Category4',
            type: 'checkbox',
            items: ['SC4_item1', 'SC4_item2', 'SC4_item3', 'SC4_item4', 'SC4_item6'],
        },
        {
          title: 'Sub-Category2',
          type: 'radio',
          items: ['SC2_item1', 'SC2_item2', 'SC2_item3'],
        },
        {
          title: 'Sub-Category3',
          type: 'dropdown',
          items: ['SC3_item1', 'SC3_item2', 'SC3_item3'],
        },
      ],
    },
    {
      title: 'header2',
      items: [
        {
          title: 'Sub-Category2(1)',
          type: 'checkbox',
          items: ['SC21_item1', 'SC21_item2', 'SC21_item3', 'SC21_item4', 'SC21_item5'],
        },
        {
          title: 'Sub-Category2(2)',
          type: 'radio',
          items: ['SC22_item1', 'SC22_item2', 'SC22_item3', 'SC22_item4'],
        },
        {
          title: 'Sub-Category2(3)',
          type: 'dropdown',
          items: ['SC23_item1', 'SC23_item2', 'SC23_item3'],
        },
      ],
    },
  ];

  export default filterHeaders;