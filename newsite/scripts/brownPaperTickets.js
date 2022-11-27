function generateBrownPaperTicketsWidget(bptId) {
  const widgetText = `
    <link rel="stylesheet" type="text/css" href="https://www.brownpapertickets.com/widget_v671.css" /> 
    <DIV ID="bpt_eventbody">
        <CENTER>
            <BR><BR>
                Brown Paper Tickets Ticket Widget Loading...
            <BR><BR>
            <A HREF="https://www.brownpapertickets.com/event/${bptId}">Click Here</A> to visit the Brown Paper Tickets event page.
        </CENTER>
        <BR><BR>
    </DIV>
    <script src="https://www.brownpapertickets.com/eventwidget.js?event=${bptId}&nodescription=1&notitle=1" type="text/javascript" language="javascript"></script>
    <script src="https://www.brownpapertickets.com/widget_v671.js?event=${bptId}" type="text/javascript" language="javascript"></script>
  `;
  return widgetText;
}

export {  generateBrownPaperTicketsWidget };