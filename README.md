# Open Hours Component - Technical Test

## Live Deployment

There is a deployment located here: http://open-hours-component.vercel.app/

## Features

- Each day of the week can be set to "Active" or "Inactive" using the switch
- Active days can have an open time and a close time.
- All labels are localised, 2 languages are currently accounted for; English and Spanish, in future builds an automatic language detector could be used to switch between translations.
- The data is being stored in local storage for the purposes of this demo. Refreshing the page after saving the changes will show the latest opening hours.

## Notes

The component is designed to be part of a parent application, not as a library component.

There is a basic implementation of a MUI theme and the styling is standard out-of-the box MUI.

There are no unit tests in place.

The UI is responsive up to a point, at least one additional layout would be need to account for the component on very small screens.
