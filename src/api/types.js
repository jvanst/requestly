const fetch = new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        id: 1,
        name: 'Enhancement',
        description: 'Request for improvement: either for a existing feature or a new one',
        steps: [
          {
            title: 'Details',
            fields: [
              {
                label: 'Summary',
                description: 'Describe what you wish the feature to accomplish',
                type: 'textarea',
                required: true
              },
              {
                label: 'Motivation',
                description: '',
                type: 'textarea',
                required: true
              },
              {
                label: 'Addtional Context',
                description: '',
                type: 'textarea',
                required: true
              },
              {
                label: 'Title',
                description: '',
                type: 'textfield',
                required: true
              }
            ]
          },
          {
            title: 'Links',
            fields: [
              {
                label: 'Link to page',
                description: '',
                type: 'textfield',
                prefix: 'https://',
                required: true
              }
            ]
          },
          {
            title: 'Files',
            fields: [
              {
                label: 'Screenshot of Page',
                description: '',
                type: 'fileupload',
                accepts: '.jpg, .jpeg, .png',
                required: true
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Bug',
        description: 'Malfunctions that should be fixed to comply with the expected behavior',
        steps: [
          {
            title: 'Details',
            fields: [
              {
                label: 'Expected Behavior',
                description: '',
                type: 'textarea',
                required: true
              },
              {
                label: 'Current Behavior',
                description: '',
                type: 'textarea',
                required: true
              },
              {
                label: 'Possible Solution',
                description: '',
                type: 'textarea',
                required: true
              },
              {
                label: 'Steps to reproduce',
                description: '',
                type: 'textarea',
                required: true
              },
              {
                label: 'Detailed Description',
                description: '',
                type: 'textarea',
                required: true
              }
            ]
          }
        ]
      }
    ])
  }, 500)
})

export { fetch }
