dmx.Component('date-range-picker-v2', {
    initialData: {
      id: null,
      start_date: null,
      end_date: null
    },
  
    attributes: {
      id: { default: null },
      noload: { type: Boolean, default: false },
      start_date: { type: String, default: null },
      end_date: { type: String, default: null },
      spinner: { type: Boolean, default: false }
    },
  
    methods: {
      setValue: function (rowData, columnDefs) {
        this.set('rowData', rowData);
        this.set('columnDefs', columnDefs);
        this.loadPicker();
      },
      reloadGrid: function () {
        dmx.nextTick(function() {
          this.loadPicker();
        }, this);
      },
      loadGrid: function () {
        dmx.nextTick(function() {
          this.loadPicker();
        }, this);
      }
    },
  
    loadPicker: function () {
      const options = this.props
      const spinner = options.spinner ? 'block' : 'none';
      this.$node.innerHTML = `<div class="d-flex justify-content-end mb-2">
            <div class="d-block me-2">
            <div class="spinner-border mt-2 spinner-border-sm" role="status" id="${options.id}-spinner" style="display: ${spinner};"></div>
            </div>
            <div id="${options.id}-picker" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 40%">
              <i class="fa fa-calendar"></i>&nbsp;
              <span></span> <i class="fa fa-caret-down"></i>
            </div>
          </div>`;
      cb = (start, end) => {
            $('#'+options.id+'-picker span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            dmx.nextTick(function () {
              this.dispatchEvent('range_set')
            }, this);
          }
      function dateRangerSelector() {
        var start = options.start_date || moment().subtract(29, 'days');
        var end = options.end_date || moment();
        $('#'+options.id+'-picker').daterangepicker(
          {
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
          },
          cb
        );

        cb(start, end);
      }
        dateRangerSelector();
    // Function to check the conditions and update the spinner visibility
    function updateSpinnerVisibility(showSpinner) {
      const spinnerElement = document.getElementById(options.id+'-spinner');
      spinnerElement.style.display = showSpinner ? 'block' : 'none';
    }
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
      if (!dmx.equal(this.props.start_date, props.start_date) || !dmx.equal(this.props.end_date, props.end_date)) {
        this.loadPicker();
      }
    },
  });