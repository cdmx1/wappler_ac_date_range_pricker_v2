Date Range Picker with a easy to use UI selector.

Instructions to use this module:
1. Enable No Load on Server Connect
2. On This module "Range Set" event, Call the SC with start_date and end_date available from this module attributes.
3. On SC Success load your Charts or Tables
4. Use the Spinner binding on the Dynamic Attributes to the SC "state.executing" 
- This way the spinner will show on the picker when SC is loading.