# Storybook Guide

## Quick Start
- **Run locally**: `npx storybook dev -p 6006`
- **Build static**: `npx storybook build`
- **Test accessibility**: `npx @storybook/test-runner`
- **Visual regression testing**: Set `CHROMATIC_PROJECT_TOKEN` secret; CI will publish and gate on changes

## Development Workflow

### Running Storybook Locally
```bash
npm run storybook
# or
npx storybook dev -p 6006
```

### Building for Production
```bash
npm run build-storybook
# or
npx storybook build
```

### Testing Stories
```bash
npm run test:stories
# or
npx @storybook/test-runner
```

## Component Organization

### Story Structure
- **Compliance/**: Privacy and regulatory components (ConsentManager)
- **Layout/**: Navigation and structural components (NavBar)
- **Content/**: Content display components (ValueCard, HeroSection)
- **Forms/**: Input and form components
- **Feedback/**: Notifications and status components

### Story Naming Convention
- Use PascalCase for component names
- Group related components in folders
- Include descriptive story names (e.g., `Default`, `Mobile`, `WithError`)

## Accessibility Testing

### Automated A11y Checks
- All stories are automatically tested with axe-core
- Color contrast validation
- Keyboard navigation testing
- Screen reader compatibility

### Manual Testing Checklist
- [ ] Tab navigation works correctly
- [ ] Focus indicators are visible
- [ ] Screen reader announces content properly
- [ ] Color contrast meets WCAG AA standards
- [ ] Interactive elements have proper ARIA labels

## Visual Regression Testing

### Chromatic Integration
- Automatic visual diff detection
- Cross-browser testing
- Responsive design validation
- Performance monitoring

### Setting Up Chromatic
1. Get project token from Chromatic
2. Add to GitHub secrets as `CHROMATIC_PROJECT_TOKEN`
3. Push to trigger visual regression tests

## Performance Considerations

### 3D and Heavy Components
- Use `forceFallback` prop to render static versions
- Implement `debugReducedMotion` for motion-sensitive users
- Set `startPaused` for complex animations

### Optimization Tips
- Lazy load heavy components
- Use React.memo for expensive renders
- Implement proper loading states
- Monitor bundle size impact

## Best Practices

### Story Development
1. **Start with Default story**: Show component in typical state
2. **Add edge cases**: Empty states, error states, loading states
3. **Test responsiveness**: Use viewport controls
4. **Document props**: Use argTypes for clear documentation
5. **Include interactions**: Test user interactions with play functions

### Component Documentation
- Use JSDoc comments for prop descriptions
- Include usage examples
- Document accessibility considerations
- Provide design system context

### Testing Strategy
- Unit tests for business logic
- Integration tests for component interactions
- Visual regression tests for UI consistency
- Accessibility tests for compliance

## Troubleshooting

### Common Issues
- **Storybook won't start**: Check Node.js version (requires 18+)
- **Missing dependencies**: Run `npm install` after adding new packages
- **TypeScript errors**: Ensure types are properly exported
- **Styling issues**: Verify CSS imports in preview.tsx

### Performance Issues
- **Slow builds**: Use SWC compiler (enabled by default)
- **Large bundle**: Check for unnecessary dependencies
- **Memory leaks**: Ensure proper cleanup in useEffect hooks

## CI/CD Integration

### GitHub Actions
- Automatic testing on push/PR
- Visual regression testing with Chromatic
- Accessibility validation
- Artifact upload for review

### Deployment
- Static build for CDN hosting
- Netlify/Vercel integration ready
- Environment-specific configurations

## Resources

### Documentation
- [Storybook Official Docs](https://storybook.js.org/)
- [Testing with Storybook](https://storybook.js.org/docs/react/writing-tests/introduction)
- [Accessibility Addon](https://storybook.js.org/addons/@storybook/addon-a11y/)

### Tools
- [Chromatic](https://www.chromatic.com/) - Visual regression testing
- [axe-core](https://github.com/dequelabs/axe-core) - Accessibility testing
- [@storybook/test-runner](https://github.com/storybookjs/test-runner) - Automated testing
