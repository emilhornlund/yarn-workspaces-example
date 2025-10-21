import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest';

// --- Mocks (must be declared before importing the component) ---

// Mock CSS module classes to predictable names
vi.mock('./App.module.scss', () => ({
  default: {
    main: 'main',
    logo: 'logo',
    react: 'react',
    card: 'card',
    readTheDocs: 'readTheDocs',
  },
}));

// Mock SVG imports (vite-style absolute and relative)
vi.mock('/vite.svg', () => ({ default: '/vite.svg' }));
vi.mock('./assets/react.svg', () => ({ default: '/assets/react.svg' }));

// After mocks, import the component
import App from './App';

let fetchMock: Mock;

describe('<App />', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ message: 'Hello from API' }),
    } as never);

    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders the main layout and headings', () => {
    render(<App />);

    // Title
    expect(
      screen.getByRole('heading', { name: /vite \+ react/i }),
    ).toBeInTheDocument();

    // HMR hint line
    expect(screen.getByRole('main').querySelector('p')).toHaveTextContent(
      /Edit\s+src\/App\.tsx\s+and save to test HMR/i,
      { normalizeWhitespace: true },
    );

    // Footer text
    expect(
      screen.getByText(/Click on the Vite and React logos to learn more/i),
    ).toBeInTheDocument();

    // Main wrapper has the mocked CSS module class
    const main = screen.getByRole('main');
    expect(main).toHaveClass('main');
  });

  it('shows logos with correct alt text and src', () => {
    render(<App />);

    const viteImg = screen.getByAltText(/vite logo/i) as HTMLImageElement;
    const reactImg = screen.getByAltText(/react logo/i) as HTMLImageElement;

    // src attributes come from our SVG mocks
    expect(viteImg.getAttribute('src')).toBe('/vite.svg');
    expect(reactImg.getAttribute('src')).toBe('/assets/react.svg');

    // React image should include both CSS classes from classNames helper
    expect(reactImg).toHaveClass('logo');
    expect(reactImg).toHaveClass('react');
  });

  it('links out to Vite and React docs', () => {
    render(<App />);

    const [viteLink, reactLink] = screen.getAllByRole('link');

    expect(viteLink).toHaveAttribute('href', 'https://vite.dev');
    expect(viteLink).toHaveAttribute('target', '_blank');

    expect(reactLink).toHaveAttribute('href', 'https://react.dev');
    expect(reactLink).toHaveAttribute('target', '_blank');
  });

  it('renders a button that greets via fetch and updates its label', async () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /greet me/i });
    await user.click(button);

    // Button text should update to the API response
    expect(
      await screen.findByRole('button', { name: /hello from api/i }),
    ).toBeInTheDocument();

    // Ensure fetch was called with the expected URL
    expect(global.fetch).toHaveBeenCalledWith('/api/hello?name=React%2BVite');
  });

  it('updates button text with API response', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /greet me/i }));
    expect(
      await screen.findByRole('button', { name: /hello from api/i }),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/api/hello?name=React%2BVite');
  });

  it('handles non-OK responses', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({
        message: 'Not Found',
      }),
    } as never);

    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /greet me/i }));
    expect(
      await screen.findByRole('button', { name: /not found/i }),
    ).toBeInTheDocument();
  });
});
