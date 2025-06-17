import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ""),
  })),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
}));

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

global.confirm = jest.fn();

global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
