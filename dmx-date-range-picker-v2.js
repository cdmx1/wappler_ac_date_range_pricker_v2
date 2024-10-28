dmx.Component('date-range-picker-v2', {
  initialData: {
    id: null,
    start_date: null,
    end_date: null
  },

  attributes: {
    id: { default: null },
    noload: { type: Boolean, default: false },
    duration: { type: Number, default: 30 },
    spinner: { type: Boolean, default: false },
    spinner_size: { type: String, default: 'sm' },
    range_picker_size: { type: String, default: 'auto' },
    spinner_color: { type: String, default: 'black' },
    picker_background_color: { type: String, default: '#FFFFFF' },
    font_size: { type: String, default: '16px' },
    icon_size: { type: String, default: '20px' },
    custom_class: { type: String, default: null },
    custom_sm_height: { type: String, default: '1.4rem' }, 
    custom_sm_width: { type: String, default: '1.4rem' }, 
    custom_sm_border_width: { type: String, default: '0.2rem' }, 
    custom_md_height: { type: String, default: '1.5rem' }, 
    custom_md_width: { type: String, default: '1.5rem' }, 
    custom_md_border_width: { type: String, default: '0.25rem' }, 
    min_date: { type: String, default: null }, 
    max_date: { type: String, default: null },
    max_span: { type: String, default: null }
  },
  methods: {
    loadPicker: function () {
      dmx.nextTick(function() {
        this.loadPicker();
      }, this);
    }
  },
  loadPicker: function () {
    const options = this.props;
    const customSpinnerSizesCSS = `
      /* Custom spinner sizes */
      .spinner-border.spinner-border-custom-sm {
        width: ${options.custom_sm_width};
        height: ${options.custom_sm_height};
        border-width: ${options.custom_sm_border_width};
      }

      .spinner-border.spinner-border-custom-md {
        width: ${options.custom_md_width};
        height: ${options.custom_md_height};
        border-width: ${options.custom_md_border_width};
      }
    `;
    if (options.spinner_size == 'custom-sm' || options.spinner_size == 'custom-md') {
      const styleElement = document.createElement('style');
      styleElement.appendChild(document.createTextNode(customSpinnerSizesCSS));
      document.head.appendChild(styleElement);
    }
    this.$node.innerHTML = `
    <div class="d-flex justify-content-end mb-2">
        <div class="d-flex align-items-center me-2">
            <div class="spinner-border spinner-border-${options.spinner_size} ${options.spinner_color}" role="status" id="${options.id}-spinner" style="display: none;"></div>
        </div>
        <div class="d-flex align-items-center" id="${options.id}-picker" style="background: ${options.picker_background_color}; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: ${options.range_picker_size}; font-size: ${options.font_size};">
            <i class="fa fa-calendar" style="font-size: ${options.icon_size};"></i>&nbsp;
            <span style="margin-right: 10px;"></span> <i class="fa fa-caret-down" style="font-size: ${options.icon_size};"></i>
        </div>
    </div>
    `;

    const minDate = options.min_date ? moment(options.min_date) : null;
    const maxDate = options.max_date ? moment(options.max_date) : null;
    const maxSpan = options.max_span
    cb = (start, end) => {
      $('#'+options.id+'-picker span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      dmx.nextTick(function () {
        this.set('start_date', start.format('YYYY-MM-DD'));
        this.set('end_date', end.format('YYYY-MM-DD'));
      }, this);
      setTimeout(() => {
        this.dispatchEvent('range_set');
      }, 100);
    };

    dateRangerSelector = () => {
      var start = moment().subtract(options.duration - 1, 'days');
      var end = moment();
      var pickerOptions = {
        startDate: start,
        endDate: end,
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
      };
    
      // Conditionally add minDate if defined
      if (minDate) {
        pickerOptions.minDate = minDate;
      }
    
      // Conditionally add maxDate if defined
      if (maxDate) {
        pickerOptions.maxDate = maxDate;
      }
    
      // Conditionally add maxSpan if defined
      if (maxSpan) {
        pickerOptions.maxSpan = {
          "days": maxSpan
        };
      }
      // Initialize daterangepicker with options
      $('#'+options.id+'-picker').daterangepicker(pickerOptions, cb);
    
      cb(start, end);
    };
    dateRangerSelector();
  },

  events: {
    range_set: Event
  },

  render: function(node) {
    if (this.$node) {
      this.$parse();
    }
    if (!this.props.noload){
      this.loadPicker();
    }
  },

  update: function (props) {
    if (!dmx.equal(this.props.spinner, props.spinner)) {
      const options = this.props;
      const spinner = options.spinner ? 'block' : 'none';
      const spinnerElement = document.getElementById(`${options.id}-spinner`);
      spinnerElement.style.display = spinner;
    }
    if (!dmx.equal(this.props.end_date, props.end_date)) {
      this.loadPicker();
    }
  },
});
