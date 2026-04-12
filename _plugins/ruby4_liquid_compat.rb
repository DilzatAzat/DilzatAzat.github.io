# frozen_string_literal: true

# Ruby 3.2+ removed taint tracking; Liquid 4.0.3 (pinned by github-pages) still calls #tainted?
# during rendering. This shim is for local preview on Ruby 4.x only; GitHub Pages uses its own stack.
class Object
  unless method_defined?(:tainted?)
    def tainted?
      false
    end
  end
end
