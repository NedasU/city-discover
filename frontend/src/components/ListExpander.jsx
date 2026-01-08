import "../styles/global.css";

export default function ListExpander({ isExpanded, setIsExpanded }) {
    return (
        <button aria-expanded={isExpanded} className="expander-header" onClick={() => (setIsExpanded(!isExpanded))}>
            <div>
                ----------
            </div>
        </button>
    );
}