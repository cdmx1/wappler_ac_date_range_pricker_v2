# Properties

## Date Range Properties
- **ID**: Unique ID for the date range picker. (Required)
- **No Auto Load**: Set to true to disable auto-load of the picker. (Default: true)

## Date Picker Options
- **Default Duration**: Default date duration from now, on load (in days). (Default: 30)
- **Range Picker Size**: Size of the range picker. (Default: '40%')
- **Picker Background Color**: Background color of the date picker. (Default: '#FFFFFF')
- **Font Size**: Font size of the date picker text. (Default: '16px')
- **Icon Size**: Size of the date picker icons. (Default: '20px')
- **Custom Class**: Custom CSS class for additional date picker styling. (Default: null)

## Spinner Options
- **Spinner Size**: Select a size for the spinner. (Default: 'sm')
  - "Small"
  - "Medium"
  - "Large"
  - "Custom Small"
  - "Custom Medium"
- **Spinner Color**: Select a color for the spinner. (Default: 'text-black')
  - "Black"
  - "Red"
  - "Blue"
  - "Green"
- **Custom Small Height**: Custom height for the small spinner. (Default: '1.4rem')
- **Custom Small Width**: Custom width for the small spinner. (Default: '1.4rem')
- **Custom Small Border Width**: Custom border width for the small spinner. (Default: '0.2rem')
- **Custom Medium Height**: Custom height for the medium spinner. (Default: '1.5rem')
- **Custom Medium Width**: Custom width for the medium spinner. (Default: '1.5rem')
- **Custom Medium Border Width**: Custom border width for the medium spinner. (Default: '0.25rem')

## Events
- **Range Set**: Fired when the range is set. (Attribute: range_set)
## Events
- **Range Set**: Fired when the range is set. (Attribute: range_set)

## Instructions
1. **Create an API**: Create an API with a DB query that includes conditions for start and end dates.
2. **Configure SC with the API**: Configure a Server Connect (SC) with the API and disable auto-load.
3. **Set the duration and other parameters**: Set the duration and other parameters as required; otherwise, leave them to their default values.
4. **Set Dynamic Events for "Range Set"**: Set Dynamic Events for **Range Set**, and call SC Load with bindings set on `start_date` and `end_date` available on the module.
5. **Load Charts or Tables**: On SC success, load the charts or tables as required.
Follow these steps to implement the date range functionality with the Server Connect API and load the charts or tables based on the selected date range.

## Dependencies
The Date Range Picker component requires the following files:
- daterangepicker.min.js
- dmx-date-range-picker-v2.js
- daterangepicker.css

Make sure to include these files in your project to use the Date Range Picker component.

## Support
If you encounter any issues or need further assistance, please reach out to the support team.

## License
The Date Range Picker component is licensed under the MIT License. Please refer to the license file for more details.
